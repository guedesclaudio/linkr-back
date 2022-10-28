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

async function getCommentsInDB(postId) {
    const comments = await connection.query(
        `
            SELECT comments.*, users.username, users.picture_url
            FROM comments JOIN users
            ON comments.user_id = users.id
            WHERE post_id = $1;
        `,
        [postId]
    );
    return comments.rows;
}

async function getPostsAuthor(postId, authorId, commentId) {
    const response = await connection.query(
        `
            SELECT 
                comments.id, 
                comments.post_id, 
                comments.user_id as comment_author, 
                posts.user_id as post_author
            FROM 
                comments JOIN posts
            ON 
                comments.post_id = posts.id
            WHERE 
                comments.post_id = $1
                AND comments.user_id = $2
                AND comments.id = $3;
        `,
        [postId, authorId, commentId]
    );
    return response.rows[0];
}

async function getFollowAuthor(authorId, userId, commentId) {
    const response = await connection.query(
        `
            SELECT 
                comments.id,
                comments.user_id as comment_author, 
                followers.follower_id
            FROM 
                comments JOIN followers
            ON 
                comments.user_id = followers.followed_id
            WHERE
                comments.user_id = $1
                AND followers.follower_id = $2
                AND comments.id = $3;
        `,
        [authorId, userId, commentId]
    );
    return response.rows;
}

export { insertCommentInDB, getCommentsInDB, getPostsAuthor, getFollowAuthor };