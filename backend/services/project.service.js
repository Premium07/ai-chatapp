import Project from "../models/project.model.js";

export const createProjectService = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Project name is required");
  }

  if (!userId) {
    throw new Error("User id is required");
  }

  const project = await Project.create({ name, users: [userId] });

  return project;
};
