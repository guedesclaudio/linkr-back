import { searchLikes } from "../helpers/searchLikes.helper.js"

async function listTimeline(req, res) {
    
    const {id, username} = res.locals.user 

    try {
        const searchResult = await searchLikes({id,username})

        res.status(200).send(searchResult)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

export {listTimeline}