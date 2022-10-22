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

export {
  insertPostInDB,
  selectHashtag,
  insertIntoHashtags,
  insertIntoMiddleHashtagsPosts,
};
