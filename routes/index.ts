import express, { Request, Response, NextFunction } from "express";
import { login, signup } from "../controllers/userController";

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);

export default router;
