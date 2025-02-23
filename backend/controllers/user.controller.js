import User from "../models/user.model.js";
import {
  createUserService,
  getAllUsersService,
} from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await createUserService(req.body);
    const token = await user.generateToken();

    delete user._doc.password;

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await user.generateToken();

    delete user._doc.password;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const profileController = async (req, res) => {
  res.status(200).json(req.user);
};

export const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    redisClient.set(token, "logout", "EX", 60 * 60 * 24);

    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ email: req.user.email });
    const allUsers = await getAllUsersService({ userId: loggedInUser._id });

    return res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
