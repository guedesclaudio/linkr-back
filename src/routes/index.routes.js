import express from "express";
import postRoutes from "./posts.routes.js";
import userRoutes from "./users.routes.js";

const router = express.Router();
router.use(postRoutes);
router.use(userRoutes);

export default router;
