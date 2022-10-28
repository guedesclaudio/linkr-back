import express from "express";
import { verifyToken } from "../middlewares/token.middleware.js";
import { verifyNewCommentSchema } from "../schemas/schemas.js";
import { insertComment, getComments, getLabel } from "../controllers/comments.controllers.js";

const router = express.Router();

router.post("/comments", verifyToken, verifyNewCommentSchema, insertComment);
router.get("/comments/:postId", verifyToken, getComments);
router.get("/comments/:postId/:authorId/:commentId", verifyToken, getLabel);

export default router;