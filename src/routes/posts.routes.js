import express from "express";
import { verifyToken } from "../middlewares/token.middleware.js";
import { verifyNewPostSchema, verifyEditPostSchema } from "../schemas/schemas.js";
import { insertPost, editPost, deletePost } from "../controllers/posts.controllers.js";

const router = express.Router();

router.post("/posts", verifyToken, verifyNewPostSchema, insertPost);
router.put("/posts", verifyToken, verifyEditPostSchema, editPost);
router.delete("/posts", verifyToken, deletePost);

export default router;