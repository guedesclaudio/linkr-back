import connection from "../database/database.js"

async function insertLike({userId, postId}) {
    return connection.query(`
    INSERT INTO likes 
    (user_id, post_id) 
    VALUES ($1, $2)`
    , [userId, postId])
}

async function deleteLike({userId, postId}) {
    return connection.query(`
    DELETE FROM likes
    WHERE user_id = $1 AND post_id = $2
    `, [userId, postId])
}

async function getPosts({postId}) {
    return (await connection.query(`
    SELECT * FROM posts
    WHERE id = $1
    `, [postId])).rows[0]
}

export {insertLike, deleteLike, getPosts}