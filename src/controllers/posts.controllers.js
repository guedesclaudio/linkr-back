import * as postsRepository from "../repositories/posts.repository.js";
import findHashtags from "find-hashtags";

const insertPost = async (req, res) => {
  const user = res.locals.user;
  const { post_url, body } = req.body;

  try {
    const insertPost = await postsRepository.insertPostInDB(
      user.id,
      post_url,
      body
    );

    const postId = insertPost.rows[0].id;
    console.log(postId);

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
};

export { insertPost };
