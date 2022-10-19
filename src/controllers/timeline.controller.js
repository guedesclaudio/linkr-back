import { getPostsData } from "../repositories/timeline.repository.js"

async function listTimeline(req, res) {
    
    try {
        const posts = await getPostsData()
        res.status(200).send(posts)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

export {listTimeline}