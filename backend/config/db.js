import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env file");
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✓ Connected to MongoDB successfully");
  } catch (error) {
    console.error("✗ MongoDB connection failed:", error.message);
    throw error;
  }
};