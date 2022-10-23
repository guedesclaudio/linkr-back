import express from "express";
import { hashtagsListTop10 } from "../controllers/hashtags.controllers.js";

const hashtagsRouter = express.Router();

hashtagsRouter.get("/hashtags", hashtagsListTop10);

export default hashtagsRouter;
