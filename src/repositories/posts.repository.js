import connection from "../database/database.js";

function insertPostInDB (userId, publishedUrl, publishedBody) {
    return connection.query(`
        INSERT INTO
            posts (user_id, post_url, body)
        VALUES
            ($1, $2, $3);
    `, [userId, `${publishedUrl}`, `${publishedBody}`]);
}

export { insertPostInDB };