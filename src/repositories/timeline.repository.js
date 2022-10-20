import connection from "../database/database.js"

async function getPostsData() {
    return (await connection.query(`
        SELECT 
            users.username,
            users.picture_url,
            posts.id,
            posts.body,
            posts.post_url,
            posts.created_at
        FROM users
        JOIN posts ON users.id = posts.user_id
        ORDER BY posts.created_at DESC
        LIMIT 20;
    `)).rows
}

async function getLikesCount() {
    return (await connection.query(`
    SELECT
        post_id,
        COUNT (likes.id) AS likes_count
    FROM likes
    GROUP BY likes.post_id
    `)).rows
}


async function getMyLikes({userId}) {
    return (await connection.query(`
    SELECT * FROM likes
    WHERE user_id = $1
    `, [userId])).rows
}

export {getPostsData, getMyLikes, getLikesCount}