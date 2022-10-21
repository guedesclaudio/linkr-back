import express from "express"
import { listTimeline } from "../controllers/timeline.controller.js"
import { verifyToken } from "../middlewares/token.middleware.js"
const router = express.Router()

router.get("/timeline", verifyToken, listTimeline)

export default router