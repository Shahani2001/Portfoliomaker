import express from "express";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
const userRoutes = express.Router();

// NEW: Direct POST to insert into User model (usermodel.js)
userRoutes.post("/users", async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, username, password: hashedPassword });
    const saved = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User inserted to 'users' collection",
      user: { id: saved._id, name: saved.name, email: saved.email, username: saved.username }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

import { register, login } from "../controller/usercontroller.js";
userRoutes.post("/register", register);
userRoutes.post("/login", login);

export default userRoutes;
