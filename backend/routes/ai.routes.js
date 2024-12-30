import { Router } from "express";
import { getResult } from "../controllers/ai.controller.js";
const router = Router();


router.get('/get-result', getResult)

export default router