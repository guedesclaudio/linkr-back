import express from "express";
import postRoutes from "./posts.routes.js";
import userRoutes from "./users.routes.js";
import searchRoutes from "./search.routes.js";
import hashtagsRoutes from "./hashtags.routes.js";
import followersRoutes from "./followers.routes.js";

const router = express.Router();
router.use(postRoutes);
router.use(userRoutes);
router.use(searchRoutes);
router.use(hashtagsRoutes);
router.use(followersRoutes);

export default router;
