import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getClientResults } from "../controllers/resultsController.js";

const router = express.Router();
router.get("/:clientId", authenticateToken, getClientResults);
export default router;

