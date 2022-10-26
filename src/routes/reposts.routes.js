import express from "express"
import { sendRepost } from "../controllers/reposts.controller.js"
import { validateRepost } from "../middlewares/reposts.middleware.js"
import { verifyToken } from "../middlewares/token.middleware.js"

const router = express.Router()

router.post("/reposts/:postId", verifyToken, validateRepost, sendRepost)

export default router