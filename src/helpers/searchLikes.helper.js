import { getPostsData, getMyLikes, getLikesCount, getListLikes } from "../repositories/timeline.repository.js"
import { getMetadata } from "../helpers/getMetadata.helper.js"

async function searchLikes({id, username}) {

    try {
        const posts = await getPostsData()
        const myLikes = await getMyLikes({id})
        const likesCount = await getLikesCount()
        const listLikes = await getListLikes()

        const postsJoinMetadata = await Promise.all(posts.map(async value => {
            let personList = []
            let messageToolTip = ""

            myLikes.filter(element => {
                if (value.id === element.post_id) {
                    value.liked = true
                }
            })
            likesCount.filter(element => {
                if (value.id === element.post_id) {
                    value.likesCount = element.likes_count
                }
            })
            for (let i in listLikes) {
                if (personList.length === 3) {
                    break
                }
                if (value.id === listLikes[i].post_id && listLikes[i].username !== username) {
                    personList.push(listLikes[i].username)
                }
            }
    
            const msg = Number(value.likesCount) - 2 === 1 ? "e outra 1 pessoa" : `e outras ${Number(value.likesCount) - 2} pessoas`
            
            if (value.liked === true && personList.length === 0) {
                messageToolTip = "Você"
            }
            else if (value.liked === true && personList.length === 1) {
                messageToolTip = `Você e ${personList[0]}`
            }
            else if (value.liked === true && personList.length >= 2) {
                messageToolTip = `Você, ${personList[0]} ${msg}`
            }
            else if (!value.liked && personList.length === 1) {
                messageToolTip = `${personList[0]}`
            }
            else if (!value.liked && personList.length === 2) {
                messageToolTip = `${personList[0]} e ${personList[1]}`
            }
            else if (!value.liked && personList.length > 2) {
                messageToolTip = `${personList[0]}, ${personList[1]} ${msg}`
            }
            else if (!value.liked && personList.length === 0) {
                messageToolTip = "Seja o primeiro a curtir"
            }
    
            const metadata = await getMetadata(value.post_url)
            return {
                ...value,
                metadata,
                messageToolTip
            }
        }))
    
        return postsJoinMetadata

    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

export {searchLikes}