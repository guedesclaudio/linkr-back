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
  const user_id = res.locals.user.id;
  const token = uuid();

  try {
    await userRepository.insertSession(user_id, token);
    return res.status(200).send({ token: token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function postLogout(req, res) {
  const token = res.locals.token;
  const user_id = res.locals.user.id;
  console.log(token, user_id);
  try {
    await userRepository.inactivateSession(user_id, token);
    return res.status(200).send({ message: "session inactivated" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function validateSession(req, res) {
  const token = res.locals.token;
  return res.status(200).send({ token: token });
}

export { createNewUser, postLogin, validateSession, postLogout };
