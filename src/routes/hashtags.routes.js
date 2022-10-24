import express from "express";
import {
  hashtagsListTop10,
  PostsIdByHashtag,
} from "../controllers/hashtags.controllers.js";

const hashtagsRouter = express.Router();

hashtagsRouter.get("/hashtags", hashtagsListTop10);
hashtagsRouter.get("/hashtag/:hashtag", PostsIdByHashtag);

export default hashtagsRouter;
