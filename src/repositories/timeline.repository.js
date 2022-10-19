import connection from "../database/database.js"

async function getPostsData() {
    return (await connection.query(`
        SELECT 
            users.username,
            users.picture_url,
            posts.body,
            posts.post_url
        FROM users
        JOIN posts ON users.id = posts.user_id;
    `)).rows
}

async function getLikesData() {
    return await (connection.query(`
        SELECT * FROM likes;
    `)).rows
}

export {getPostsData, getLikesData}