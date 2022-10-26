import {getPosts} from "../repositories/likes.repository.js"
import { queryUserRepost } from "../repositories/reposts.repository.js"


async function validateRepost(req, res, next) {

    const {postId} = req.body
    const userId = res.locals.user.id

    if (!postId || isNaN(postId)) {
        return res.sendStatus(400)
    }

    try {
        const post = await getPosts({postId})

        if (!post) {
            return res.sendStatus(404)
        }

        const userRepost = await queryUserRepost({postId, userId})
        
        if (userRepost) {
            return res.sendStatus(400)
        }
        next()

    } catch (error) {
        console.error
        res.sendStatus(500)
    }
}

export {validateRepost}