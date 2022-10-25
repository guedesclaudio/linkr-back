import connection from "../database/database.js";

async function insertFollower(follower_id, followed_id) {
  return connection.query(
    `
  INSERT INTO followers 
  (follower_id, followed_id) 
  VALUES ($1, $2)`,
    [Number(follower_id), Number(followed_id)]
  );
}

async function deleteFollower(follower_id, followed_id) {
  return connection.query(
    `
  DELETE FROM followers
  WHERE follower_id = $1 AND followed_id = $2
  `,
    [Number(follower_id), Number(followed_id)]
  );
}

async function listFollowed(follower_id) {
  return (
    await connection.query(
      `
  SELECT "followed_id" FROM followers
  WHERE "follower_id" = $1
  `,
      [follower_id]
    )
  ).rows;
}

async function findFollowed(follower_id, followed_id) {
  return connection.query(
    `
  SELECT * FROM followers 
  WHERE follower_id = $1 AND
  followed_id = $2`,
    [Number(follower_id), Number(followed_id)]
  );
}

export { insertFollower, deleteFollower, listFollowed, findFollowed };
