import {getPosts} from "../repositories/likes.repository.js"

async function validateRepost(req, res, next) {

    const {postId} = req.body

    if (!postId || isNaN(postId)) {
        return res.sendStatus(400)
    }

    try {
        const post = await getPosts({postId})

        if (!post) {
            return res.sendStatus(404)
        }
        return console.log("post " + postId + " repostado")
        next()

    } catch (error) {
        console.error
        res.sendStatus(500)
    }
}

export {validateRepost}