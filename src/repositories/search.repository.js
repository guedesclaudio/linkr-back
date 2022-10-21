import connection from "../database/database.js";

async function getSearchUser(search) {
  return (
    await connection.query(
      `
    SELECT username, picture_url
    FROM users 
    WHERE username LIKE $1
    ORDER BY username
    LIMIT 5;
    `,
      [`${search}%`]
    )
  ).rows;
}
export { getSearchUser };
