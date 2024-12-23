import User from "../models/user.model.js";

export const createUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  // Create user in database

  const hashPassword = await User.hashPassword(password);
  const user = await User.create({ email, password: hashPassword });

  return user;
};
