import {insertedRepost} from "../repositories/reposts.repository.js"

async function sendRepost(req, res) {

    const {postId} = req.body
    const userId = res.locals.user.id
    
    try {
        await insertedRepost({postId, userId})
        res.sendStatus(201)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

export {sendRepost}