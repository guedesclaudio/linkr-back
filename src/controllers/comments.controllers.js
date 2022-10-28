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
  const post_id = req.params.postId;

  try {
    const comments = await commentsRepository.getCommentsInDB(post_id);
    return res.status(200).send(comments);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function getLabel(req, res) {
  const user = res.locals.user;
  const post_id = req.params.postId;
  const author_id = req.params.authorId;
  const comment_id = req.params.commentId;

  try {
    const responsePostsAuthor = await commentsRepository.getPostsAuthor(post_id, author_id, comment_id);
    const responseFollowing = await commentsRepository.getFollowAuthor(author_id, user.id, comment_id);

    if (responsePostsAuthor.comment_author === responsePostsAuthor.post_author) {
      return res.status(200).send({ isThePostsAuthor: true });

    } else {
      if (responseFollowing.length > 0) {
        return res.status(200).send({ 
          isThePostsAuthor: false,
          isFollowing: true
        });
      }

      return res.status(200).send({ 
        isThePostsAuthor: false,
        isFollowing: false
      });
    }

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { insertComment, getComments, getLabel };