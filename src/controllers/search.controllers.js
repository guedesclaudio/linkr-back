import { getSearchUser } from "../repositories/search.repository.js";

async function searchUser(req, res) {
  const { search } = req.body;
  try {
    const resultSearch = await getSearchUser(search);

    res.status(200).send(resultSearch);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { searchUser };
