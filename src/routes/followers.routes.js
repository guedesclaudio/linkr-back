import express from "express";
import {
  followOrUnfollowUser,
  getFollowed,
} from "../controllers/followers.controllers.js";
import { verifyToken } from "../middlewares/token.middleware.js";

const router = express.Router();

router.post("/followers", verifyToken, followOrUnfollowUser);
router.get("/followers", verifyToken, getFollowed);

export default router;
