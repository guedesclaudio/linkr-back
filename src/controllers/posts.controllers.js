import * as postsRepository from "../repositories/posts.repository.js";
import findHashtags from "find-hashtags";

async function insertPost(req, res) {
  const user = res.locals.user;
  const { post_url, body } = req.body;

  try {
    const insertPost = await postsRepository.insertPostInDB(
      user.id,
      post_url,
      body
    );

    const postId = insertPost.rows[0].id;
    const hashtags = findHashtags(body);
    const hashtagsId = [];

    if (hashtags.length !== 0) {
      for (let i = 0; i < hashtags.length; i++) {
        const hashtagFound = (await postsRepository.selectHashtag(hashtags[i]))
          .rows[0];

        if (hashtagFound) {
          hashtagsId.push(hashtagFound.id);
          continue;
        }

        let hashtag = await postsRepository.insertIntoHashtags(hashtags[i]);
        hashtagsId.push(hashtag.rows[0].id);
      }

      for (let i = 0; i < hashtagsId.length; i++) {
        postsRepository.insertIntoMiddleHashtagsPosts({
          post_id: postId,
          hashtag_id: hashtagsId[i],
        });
      }
    }

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
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

async function editPost(req, res) {
  const user = res.locals.user;
  const post_id = req.headers.postid;
  const { body } = req.body;

  try {
    const postBelongsToUser = await postsRepository.checkIfPostBelongsToUser(
      user.id,
      post_id
    );

    if (postBelongsToUser) {
      try {
        await postsRepository.editPostInDB(post_id, body);
        return res.status(204).send({body});
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
