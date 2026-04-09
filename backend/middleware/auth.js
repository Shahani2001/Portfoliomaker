import jwt from "jsonwebtoken";
import UserPortfolio from "../models/portfoliomodel.js";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function authMiddleware(req, res, next) {
  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: "JWT secret is not configured",
    });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
        success: false,
      message: "Not authorized, no token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await UserPortfolio.findById(decoded.userId).select("-password");
    if (!req.user) {
        return res.status(401).json({
        success: false,
        message: "Not authorized, user not found",
      });
    }
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({
      success: false,
      message: "Token invalid",
    });
  }
}