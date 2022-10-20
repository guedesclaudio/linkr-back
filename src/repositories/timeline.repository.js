import connection from "../database/database.js"

async function getPostsData() {
    return (await connection.query(`
        SELECT 
            users.username,
            users.picture_url,
            posts.body,
            posts.post_url,
            posts.created_at
        FROM users
        JOIN posts ON users.id = posts.user_id
        ORDER BY posts.created_at DESC
        LIMIT 20;
    `)).rows
}

async function getLikesData() {
    return await (connection.query(`
        SELECT * FROM likes;
    `)).rows
}

export {getPostsData, getLikesData}