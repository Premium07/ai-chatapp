import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  loginController,
  logoutController,
  profileController,
} from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  createUserController
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  loginController
);

router.get("/profile", authUser, profileController);

router.get("/logout", authUser, logoutController);

router.get("/allusers", authUser, getAllUsersController);
export default router;
