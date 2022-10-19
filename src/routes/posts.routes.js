import express from "express";
import { verifyToken } from "../middlewares/token.middleware.js";
import { verifyNewPostSchema } from "../schemas/schemas.js";
import { insertPost } from "../controllers/posts.controllers.js";

const router = express.Router();

router.post("/posts", verifyToken, verifyNewPostSchema, insertPost);

export default router;