import {
  addUsersToProjectService,
  createProjectService,
  getAllProjectByUserIdService,
} from "../services/project.service.js";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";

export const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;

    const loggedUser = await User.findOne({ email: req.user.email });

    const userId = loggedUser._id;

    const newProject = await createProjectService({ name, userId });

    return res.status(201).json(newProject);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ email: req.user.email });

    const allUserProjects = await getAllProjectByUserIdService({
      userId: loggedInUser._id,
    });

    return res.status(200).json({ projects: allUserProjects });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

export const addUsersToProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId, users } = req.body;

    const loggedInUser = await User.findOne({ email: req.user.email });

    const project = await addUsersToProjectService({
      projectId,
      users,
      userId: loggedInUser._id,
    });

    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
