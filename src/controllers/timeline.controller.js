import { getPostsData } from "../repositories/timeline.repository.js"
import urlMetadata from "url-metadata"

async function listTimeline(req, res) {

    try {
        const posts = await getPostsData()

        const postsJoinMetadata = await Promise.all(posts.map(async value => {
            const metadata = await getMetadata(value.post_url)
            return {
                ...value,
                metadata
            }
        }))

        res.status(200).send(postsJoinMetadata)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

async function getMetadata(url) {
    try {
        const {title, image, description} = await urlMetadata(url)
        const metadata = {title, image, description}
        return metadata
    } catch (error) {
        res.sendStatus(500)
    }
}

export {listTimeline}