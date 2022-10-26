import connection from "../database/database.js";

function insertPostInDB(userId, publishedUrl, publishedBody) {
  return connection.query(
    `
        INSERT INTO
            posts (user_id, post_url, body)
        VALUES
            ($1, $2, $3) RETURNING id;
    `,
    [userId, `${publishedUrl}`, `${publishedBody}`]
  );
}

const selectHashtag = (hashtag) => {
  return connection.query(`SELECT * FROM hashtags WHERE name = $1;`, [hashtag]);
};

const insertIntoHashtags = (hashtag) => {
  return connection.query(
    "INSERT INTO hashtags (name) VALUES ($1) RETURNING id;",
    [hashtag]
  );
};

const insertIntoMiddleHashtagsPosts = ({ post_id, hashtag_id }) => {
  return connection.query(
    `INSERT INTO hashtags_posts (post_id, hashtag_id) VALUES ($1, $2);`,
    [post_id, hashtag_id]
  );
};

async function checkIfPostBelongsToUser(user_id, post_id) {
  const post = await connection.query(
    `
        SELECT * FROM posts WHERE id = $1 AND user_id = $2;
    `,
    [post_id, user_id]
  );

  if (post.rows.length > 0) {
    return true;
  }

  return false;
}

function editPostInDB(post_id, body) {
  return connection.query(
    `
        UPDATE posts
        SET body = $1
        WHERE id = $2;
    `,
    [body, post_id]
  );
}

function deletePostInDB (post_id) {
    return connection.query(`
        DELETE FROM posts
        WHERE id = $1;
    `, [post_id]);
}

function deleteLikesPost (post_id) {
  return connection.query(`
      DELETE FROM likes
      WHERE post_id = $1;
  `, [post_id]);
}

function deleteHashtagsPost (post_id) {
  return connection.query(`
      DELETE FROM hashtags_posts
      WHERE post_id = $1;
  `, [post_id]);
}

function deleteCommentsPost (post_id) {
  return connection.query(`
      DELETE FROM comments
      WHERE post_id = $1;
  `, [post_id]);
}
function deleteReposts (post_id) {
  return connection.query(`
      DELETE FROM reposts
      WHERE post_id = $1;
  `, [post_id]);
}

export {
  insertPostInDB,
  selectHashtag,
  insertIntoHashtags,
  insertIntoMiddleHashtagsPosts,
  checkIfPostBelongsToUser,
  editPostInDB,
  deletePostInDB,
  deleteLikesPost,
  deleteHashtagsPost,
  deleteCommentsPost,
  deleteReposts
};
