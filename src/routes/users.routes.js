import express from "express";
import {
  createNewUser,
  postLogin,
  validateSession,
  postLogout,
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
router.post("/logout", verifyToken, postLogout);

export default router;
