import { Router } from "express";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  createProject,
  addUsersToProject,
  getAllProjects,
} from "../controllers/project.controller.js";

const router = Router();

router.post(
  "/create",
  body("name").isString().withMessage("Name is required"),
  authUser,
  createProject
);

router.get("/allprojects", authUser, getAllProjects);

router.put(
  "/add-user",
  authUser,
  body("projectId").isString().withMessage("Project Id is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Users must be an array of strings"),
  addUsersToProject
);

export default router;
