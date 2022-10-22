import connection from "../database/database.js";

async function verifyToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  try {
    if (token !== null && token !== undefined) {
      const findSession = await connection.query(
        `SELECT * FROM sessions WHERE token = $1;`,
        [token]
      );
      if (findSession.rows.length > 0) {
        const findUser = await connection.query(
          `SELECT * FROM users WHERE id = $1;`,
          [findSession.rows[0].user_id]
        );
        const user = findUser.rows[0];
        delete user.password;
        res.locals.user = user;
        res.locals.token = token;
        next();
        return;
      }
    }
    return res.sendStatus(401);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { verifyToken };
