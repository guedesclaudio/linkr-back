import express from "express";
import { verifyToken } from "../middlewares/token.middleware.js";
import { verifyNewCommentSchema } from "../schemas/schemas.js";
import { insertComment } from "../controllers/comments.controllers.js";

const router = express.Router();

router.post("/comments", verifyToken, verifyNewCommentSchema, insertComment);

export default router;