import * as followersRepository from "../repositories/followers.repository.js";

async function followOrUnfollowUser(req, res) {
  const follower_id = res.locals.user.id;
  const { followed_id, follow_type } = req.body;

  try {
    const existingFollowed = await followersRepository.findFollowed(
      follower_id,
      followed_id
    );
    if (existingFollowed.rowCount !== 0 && follow_type === "follow") {
      return res
        .status(404)
        .send({ error: "user is already listed as followed" });
    }

    if (follow_type === "follow") {
      await followersRepository.insertFollower(follower_id, followed_id);
      return res.status(200).send({ message: "user followed" });
    } else if (follow_type === "unfollow") {
      await followersRepository.deleteFollower(follower_id, followed_id);
      return res.status(200).send({ message: "user unfollowed" });
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

async function getFollowed(req, res) {
  const follower_id = res.locals.user.id;
  try {
    const followed_users = await followersRepository.listFollowed(follower_id);
    return res.status(200).send(followed_users);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export { followOrUnfollowUser, getFollowed };
