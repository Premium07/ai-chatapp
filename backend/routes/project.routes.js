import { Router } from "express";
import { createProject } from "../controllers/project.controller.js	";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  body("name").isString().withMessage("Name is required"),
  authUser,
  createProject
);

export default router;
