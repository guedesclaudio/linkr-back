import express from "express"
import { listTimeline } from "../controllers/timeline.controller.js"
const router = express.Router()

router.get("/timeline", listTimeline)

export default router