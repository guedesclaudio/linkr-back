import connection from "../database/database.js";

async function findExistingUser(email) {
  try {
    const existingUser = await connection.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    );
    return existingUser.rows;
  } catch (error) {
    return error.message;
  }
}

async function insertNewUser(username, email, passwordHash, picture_url) {
  try {
    return await connection.query(
      "INSERT INTO users (username, email, password, picture_url) VALUES ($1, $2, $3, $4);",
      [username, email, passwordHash, picture_url]
    );
  } catch (error) {
    return error.message;
  }
}

async function insertSession(user_id, token) {
  try {
    return await connection.query(
      `INSERT INTO sessions ("user_id", token) VALUES ($1, $2);`,
      [user_id, token]
    );
  } catch (error) {
    return error.message;
  }
}

export { findExistingUser, insertNewUser, insertSession };
