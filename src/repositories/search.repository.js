import connection from "../database/database.js";

async function postSearchUser(search) {
  return (
    await connection.query(
      `
    SELECT id, username, picture_url
    FROM users 
    WHERE username LIKE $1
    ORDER BY username
    LIMIT 5;
    `,
      [`${search}%`]
    )
  ).rows;
}
export { postSearchUser };
