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

async function findActiveSession(token) {
  try {
    const activeSession = await connection.query(
      `SELECT * FROM sessions WHERE active = TRUE AND token = $1`,
      [token]
    );
    return activeSession.rows;
  } catch (error) {
    return error.message;
  }
}

async function inactivateSession(user_id, token) {
  try {
    const sessionId = await connection.query(
      `SELECT id FROM sessions WHERE "user_id" = $1 AND token = $2 AND active = true;`,
      [user_id, token]
    );
    if (!sessionId.rows[0]) return false;
    return await connection.query(
      `UPDATE sessions SET active = false WHERE id = $1;`,
      [sessionId.rows[0].id]
    );
  } catch (error) {
    return error.message;
  }
}

async function findExistingUserById(userId) {
  try {
    const existingUser = await connection.query(
      `SELECT id, username FROM users WHERE id = $1;`,
      [userId]
    );
    return existingUser.rows;
  } catch (error) {
    return error.message;
  }
}

export {
  findExistingUser,
  insertNewUser,
  insertSession,
  inactivateSession,
  findActiveSession,
  findExistingUserById,
};
