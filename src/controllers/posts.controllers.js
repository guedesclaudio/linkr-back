import * as postsRepository from "../repositories/posts.repository.js";

async function insertPost (req, res) {
    const user = res.locals.user;
    const { post_url, body } = req.body;

    try {
        await postsRepository.insertPostInDB(user.id, post_url, body);
        return res.sendStatus(201);

    } catch (error) {
        return res.sendStatus(500);
    }
}

async function editPost (req, res) {
    const user = res.locals.user;
    const post_id = req.headers.postid;
    const { body } = req.body;

    try {
        const postBelongsToUser = await postsRepository.checkIfPostBelongsToUser(user.id, post_id);

        if (postBelongsToUser) {
            try {
                await postsRepository.editPostInDB(post_id, body);
                return res.sendStatus(204);

            } catch (error) {
                return res.sendStatus(500);
            }
        }

        return res.sendStatus(401);
        
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function deletePost (req, res) {
    const user = res.locals.user;
    const post_id = req.headers.postid;

    try {
        const postBelongsToUser = await postsRepository.checkIfPostBelongsToUser(user.id, post_id);

        if (postBelongsToUser) {
            try {
                await postsRepository.deletePostInDB(post_id);
                return res.sendStatus(204);

            } catch (error) {
                return res.sendStatus(500);
            }
        }

        return res.sendStatus(401);
        
    } catch (error) {
        return res.sendStatus(500);
    }
}

export { insertPost, editPost, deletePost };