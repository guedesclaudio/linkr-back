import connection from "../database/database.js";

function insertPostInDB (userId, publishedUrl, publishedBody) {
    return connection.query(`
        INSERT INTO
            posts (user_id, post_url, body)
        VALUES
            ($1, $2, $3);
    `, [userId, `${publishedUrl}`, `${publishedBody}`]);
}

async function checkIfPostBelongsToUser (user_id, post_id) {
    const post = await connection.query(`
        SELECT * FROM posts WHERE id = $1 AND user_id = $2;
    `, [post_id, user_id]);

    if (post.rows.length > 0) {
        return true;
    }

    return false;
}

function editPostInDB (post_id, body) {
    return connection.query(`
        UPDATE posts
        SET body = $1
        WHERE id = $2;
    `, [body, post_id]);
}

export { insertPostInDB, checkIfPostBelongsToUser, editPostInDB };