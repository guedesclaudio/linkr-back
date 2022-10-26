import * as commentsRepository from "../repositories/comments.repository.js";

async function insertComment(req, res) {
  const user = res.locals.user;
  const { comment } = req.body;
  const post_id = req.headers.postid;

  try {
    await commentsRepository.insertCommentInDB(
      user.id,
      post_id,
      comment
    );
    return res.sendStatus(201);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function getComments(req, res) {
    
}

export { insertComment, getComments };