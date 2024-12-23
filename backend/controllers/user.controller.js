import createUserService from "../services/user.service.js";
import { validationResult } from "express-validator";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await createUserService(req.body);
    const token = await user.generateAuthToken();

    res.status(201).json(user, token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};
