import {insertLike, deleteLike} from "../repositories/likes.repository.js"

async function likeOrDeslikePost(req, res) {

    const {postId} = req.params
    const {likeValue, userId} = req.body

    try {
        if (likeValue) {
            await insertLike({userId, postId})
            return res.sendStatus(200)
        }
    
        await deleteLike({userId, postId})
        return res.sendStatus(200)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

export {likeOrDeslikePost}