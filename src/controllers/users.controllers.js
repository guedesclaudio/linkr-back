import bcrypt from "bcrypt";
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

export { createNewUser };
