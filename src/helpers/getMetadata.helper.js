import urlMetadata from "url-metadata"

async function getMetadata(url, res) {
    try {
        const {title, image, description} = await urlMetadata(url)
        const metadata = {title, image, description}
        return metadata
    } catch (error) {
        res.sendStatus(500)
    }
}

export {getMetadata}