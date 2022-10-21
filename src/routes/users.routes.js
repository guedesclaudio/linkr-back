import express from "express";
import {
  createNewUser,
  postLogin,
  validateSession,
} from "../controllers/users.controllers.js";
import { verifyToken } from "../middlewares/token.middleware.js";
import {
  validateNewUser,
  validateLogin,
} from "../middlewares/users.middlewares.js";

const router = express.Router();

router.post("/signup", validateNewUser, createNewUser);
router.post("/signin", validateLogin, postLogin);
router.get("/sessions", verifyToken, validateSession);

export default router;
