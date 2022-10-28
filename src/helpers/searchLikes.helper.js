import { getPostsData, getMyLikes, getLikesCount, getRepostsCount, getListLikes } from "../repositories/timeline.repository.js"
import { getMetadata } from "../helpers/getMetadata.helper.js"

async function searchLikes({id, username, limit, req, res}) {

    try {
        const posts = await getPostsData(limit)
        const myLikes = await getMyLikes(id)
        const likesCount = await getLikesCount()
        const repostsCount = await getRepostsCount()
        const listLikes = await getListLikes()
        const auxArr = []
        const totalData = []
        let arr = []
        let finish = false

        await Promise.all(posts.map(async value => {
            let personList = []
            let messageToolTip = ""
            let newValue = {}
            value.liked = false
            value.likesCount = 0
            value.repostsCount = 0
            
            myLikes.filter(element => {
                if (value.post_id === element.post_id) {
                    value.liked = true
                } 
            })
            likesCount.filter(element => {
                if (value.post_id === element.post_id) {
                    value.likesCount = Number(element.likes_count)
                }
            })
            repostsCount.filter(element => {
                if (value.post_id === element.post_id) {
                    value.repostsCount = Number(element.reposts_count)
                }
            })
            for (let i in listLikes) {
                if (personList.length === 3) {
                    break
                }
                if (value.post_id === listLikes[i].post_id && listLikes[i].username !== username) {
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
    
            const metadata = await getMetadata(value.post_url, res)

            if(!value.repost_id) {
                value.reposted_on = value.created_at
            }
            if (value.repost_id) {
                if (!auxArr.find(element => element == value.post_id)) {
                    newValue = {...value,
                        metadata,
                        messageToolTip,
                        repost_id: null,
                        repost_user_id: null,
                        reposted_by: null,
                        reposted_on: new Date(value.created_at),
                    }
                    totalData.push(newValue)
                }
                auxArr.push(value.post_id)
            }
            
            totalData.push({
                ...value,
                metadata,
                messageToolTip
            })
        }))
        
        arr = totalData.sort(ordened)
        
        return arr.slice(0, limit)

    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

function ordened(a,b) {
    return new Date(b.reposted_on) - new Date(a.reposted_on)
}

export {searchLikes}