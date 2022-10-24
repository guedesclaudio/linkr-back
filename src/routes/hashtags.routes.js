import express from "express";
import {
  hashtagsListTop10,
  PostsIdByHashtag,
} from "../controllers/hashtags.controllers.js";
import { verifyToken } from "../middlewares/token.middleware.js";

const hashtagsRouter = express.Router();

hashtagsRouter.get("/hashtags", verifyToken, hashtagsListTop10);
hashtagsRouter.get("/hashtag/:hashtag", verifyToken, PostsIdByHashtag);

export default hashtagsRouter;
