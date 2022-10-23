import { getTop10Hashtags } from "../repositories/hashtags.repository.js";

async function hashtagsListTop10(req, res) {
  try {
    const hashtagList = await getTop10Hashtags();

    res.send(hashtagList.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { hashtagsListTop10 };
