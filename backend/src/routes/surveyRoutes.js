import express from "express";
import { submitSurvey } from "../controllers/surveyController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/", authenticateToken, submitSurvey);
export default router;

