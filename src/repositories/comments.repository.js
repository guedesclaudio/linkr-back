import connection from "../database/database.js";

function insertCommentInDB(userId, postId, comment) {
  return connection.query(
    `
        INSERT INTO
            comments (user_id, post_id, body)
        VALUES
            ($1, $2, $3) RETURNING id;
    `,
    [userId, postId, comment]
  );
}

function getCommentsInDB() {
    return connection.query(
        `
            SELECT
                comments.*, followers.follower_id FROM comments
            JOIN 
                followers ON comments.user_id = followed_id;
        `
    );
}

export { insertCommentInDB, getCommentsInDB };

/*
`
    SELECT
        comments.*, followers.follower_id FROM comments
    JOIN 
        followers ON comments.user_id = followed_id;
`
*/