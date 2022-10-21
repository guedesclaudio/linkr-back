import {insertLike, deleteLike} from "../repositories/likes.repository.js"

async function likeOrDeslikePost(req, res) {

    const {postId} = req.params
    const {likeValue} = req.body
    const id = res.locals.userId

    try {
        if (likeValue) {
            await insertLike({id, postId})
            return res.sendStatus(200)
        }
    
        await deleteLike({id, postId})
        return res.sendStatus(200)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

export {likeOrDeslikePost}