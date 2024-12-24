import { createProjectService } from "../services/project.service.js";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";

export const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;

    const loggedUser = await User.findOne({ email });

    const userId = loggedUser._id;

    const newProject = await createProjectService({ name, userId });

    return res.status(201).json(newProject);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
