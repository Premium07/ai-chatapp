import Project from "../models/project.model.js";

export const createProjectService = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Project name is required");
  }

  if (!userId) {
    throw new Error("User id is required");
  }

  let project;
  try {
    project = await Project.create({ name, users: [userId] });
  } catch (error) {
    throw new Error(error.message);
  }

  return project;
};

export const getAllProjectByUserIdService = async ({ userId }) => {
  if (!userId) {
    throw new Error("User id is required");
  }

  const allUserProjects = await Project.find({ users: userId });

  return allUserProjects;
};  
