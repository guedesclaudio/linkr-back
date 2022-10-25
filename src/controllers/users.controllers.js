import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import * as userRepository from "../repositories/users.repository.js";

async function createNewUser(req, res) {
  const { email, username, password, picture_url } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await userRepository.insertNewUser(
      username,
      email,
      passwordHash,
      picture_url
    );
    return res.status(201).send({ message: "User created!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function postLogin(req, res) {
  const user_id = res.locals.user_id;
  const username = res.locals.username;
  const picture_url = res.locals.picture_url;
  const token = uuid();

  try {
    await userRepository.insertSession(user_id, token);
    return res.status(200).send({ token, user_id, username, picture_url });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function postLogout(req, res) {
  const token = res.locals.token;
  const user_id = res.locals.user.id;
  try {
    const response = await userRepository.inactivateSession(user_id, token);

    if (!response)
      return res.status(404).send({ error: "session was already inactive" });
    return res.status(200).send({ message: "session inactivated" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function validateSession(req, res) {
  const token = res.locals.token;
  const activeSession = await userRepository.findActiveSession(token);
  if (activeSession.length !== 0) {
    return res.status(200).send({ token: activeSession[0].token });
  } else return res.status(404).send({ error: "session is inactive" });
}

async function verifyUserById(req, res) {
  const { userId } = req.params;
  try {
    const existingUser = await userRepository.findExistingUserById(userId);
    return res.status(200).send(existingUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export {
  createNewUser,
  postLogin,
  validateSession,
  postLogout,
  verifyUserById,
};
