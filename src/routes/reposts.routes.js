import express from "express"
import { validateRepost } from "../middlewares/reposts.middleware.js"

const router = express.Router()

router.post("/reposts", validateRepost)

export default router