import express from "express";
import {
  createPortfolio,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio,
} from "../controller/portfolioController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", createPortfolio);
router.get("/:username", getPortfolioByUsername); // public, no auth
router.put("/:username", authMiddleware, updatePortfolio);
router.delete("/:username", authMiddleware, deletePortfolio);

export default router;