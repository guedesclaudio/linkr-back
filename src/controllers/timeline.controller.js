import { searchLikes } from "../helpers/searchLikes.helper.js";

async function listTimeline(req, res) {
  const { id, username } = res.locals.user;

  try {
    const searchResult = await searchLikes({ id, username, req, res });

    return res.status(200).send(searchResult);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export { listTimeline };
