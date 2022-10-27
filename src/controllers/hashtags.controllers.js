import {
  getTop10Hashtags,
  getPostsIdByHashtag,
} from "../repositories/hashtags.repository.js";

async function hashtagsListTop10(req, res) {
  try {
    const hashtagList = await getTop10Hashtags();

    return res.send(hashtagList.rows);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function PostsIdByHashtag(req, res) {
  const { hashtag } = req.params;

  try {
    const postsList = await getPostsIdByHashtag(hashtag);

    return res.send(postsList.rows);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { hashtagsListTop10, PostsIdByHashtag };
