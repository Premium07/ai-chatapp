import { Router } from "express";
import { createProject } from "../controllers/project.controller.js	";
import { body } from "express-validator";

const router = Router();

router.post(
  "/create",
  body("name").isString().withMessage("Name is required"),
  createProject
);

export default router;
