import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

// Load .env from the __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Allow all origins in development, restrict in production
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const startServer = async () => {
  try {
    console.log("Starting server...");
    await connectDB();
    app.listen(port, () => {
      console.log(`\n✓ Server Started on http://localhost:${port}\n`);
    });
  } catch (err) {
    console.error("\n✗ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();