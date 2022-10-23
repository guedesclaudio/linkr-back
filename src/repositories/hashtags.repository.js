import connection from "../database/database.js";

async function getTop10Hashtags() {
  return await connection.query(
    `SELECT hashtags.name, 
    hashtags_posts.hashtag_id, 
    COUNT(hashtags_posts.hashtag_id)
    FROM hashtags_posts
    JOIN hashtags
        ON hashtags_posts.hashtag_id = hashtags.id 
    GROUP BY hashtag_id, hashtags.name 
    ORDER BY COUNT DESC, name
    LIMIT 10;`
  );
}

export { getTop10Hashtags };
