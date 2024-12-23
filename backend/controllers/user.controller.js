import userService from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};