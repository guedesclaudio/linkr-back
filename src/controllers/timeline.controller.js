import { searchLikes } from "../helpers/searchLikes.helper.js";

async function listTimeline(req, res) {
  const { id, username } = res.locals.user;
  const {page} = req.query
  let limit = 10

  if (page && page > 0) {
    console.log(page)
    limit = Number(page) * 10
  }

  try {
    const searchResult = await searchLikes({ id, username, limit, req, res });

    res.status(200).send(searchResult);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
}

export { listTimeline };
