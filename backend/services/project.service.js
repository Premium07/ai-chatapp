import mongoose from "mongoose";
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

export const addUsersToProjectService = async ({
  projectId,
  users,
  userId,
}) => {
  if (!projectId) {
    throw new Error("Project id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Project id is invalid");
  }

  if (!users) {
    throw new Error("Users are required");
  }

  if (
    !Array.isArray(users) ||
    users.some((user) => !mongoose.Types.ObjectId.isValid(user))
  ) {
    throw new Error("Project id is invalid");
  }

  if (!userId) {
    throw new Error("User id is required");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Project id is invalid");
  }

  const project = await Project.findOne({ _id: projectId, users: userId });

  if (!project) {
    throw new Error("User is not authorized to add users to this project");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    { _id: projectId },
    { $addToSet: { users: { $each: users } } },
    { new: true }
  );

  return updatedProject;
};

export const getProjectByIdService = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("Project id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Project id is invalid");
  }

  const project = await Project.findById({ _id: projectId }).populate("users");

  return project;
};
