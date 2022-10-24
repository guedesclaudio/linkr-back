import express from "express";
import { searchUser } from "../controllers/search.controllers.js";
import { verifyToken } from "../middlewares/token.middleware.js";

const router = express.Router();

router.post("/search", verifyToken, searchUser);

export default router;
