import connection from "../database/database.js"

async function getPostsData() {
    return (await connection.query(`
        SELECT 
            users.id AS user_id,
            users.username AS owner_post,
            users.picture_url,
            posts.id AS post_id,
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

async function getListLikes() {
    return (await connection.query(`
    SELECT 
        users.username,
        likes.post_id
    FROM likes
    JOIN users ON users.id = likes.user_id;
    `)).rows
}


async function getMyLikes({id}) {
    return (await connection.query(`
    SELECT * FROM likes
    WHERE user_id = $1
    `, [id])).rows
}

export {getPostsData, getMyLikes, getLikesCount, getListLikes}