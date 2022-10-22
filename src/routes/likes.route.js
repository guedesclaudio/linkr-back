import express from "express"
import { likeOrDeslikePost } from "../controllers/likes.controller.js"
import { validateLikeOrDeslikePost } from "../middlewares/likes.middleware.js"
const router = express.Router()

router.post("/likes/:postId", validateLikeOrDeslikePost, likeOrDeslikePost)

export default router