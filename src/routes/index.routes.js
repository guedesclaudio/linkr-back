import express from "express";
import postRoutes from "./posts.routes.js";
import userRoutes from "./users.routes.js";
import searchRoutes from "./search.routes.js";

const router = express.Router();
router.use(postRoutes);
router.use(userRoutes);
router.use(searchRoutes);

export default router;
