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

export { insertPost };