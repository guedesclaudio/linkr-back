import connection from "../database/database.js";

function insertedRepost({postId, userId}) {
    return connection.query(`
    INSERT INTO reposts (post_id, user_id) 
    VALUES ($1, $2)
    `, [postId, userId])
}

async function queryUserRepost({postId, userId}) {
    return (await connection.query(`
    SELECT * FROM reposts
    WHERE post_id = $1 AND user_id = $2
    `, [postId, userId])).rows[0]
}

export {insertedRepost, queryUserRepost}