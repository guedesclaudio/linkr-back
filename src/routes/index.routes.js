import express from "express";
import postRoutes from "./posts.routes.js";

const router = express.Router();
router.use(postRoutes);

export default router;