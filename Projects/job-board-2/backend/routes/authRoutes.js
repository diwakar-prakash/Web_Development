import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// this is for the signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ 
        message: "Email already exists, Try to signup with another email id " 
    });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed
    });

    res.status(201).json({
      message: "User created",
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// this one if for the login part
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ 
        message: "User not found" 
    });


    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ 
        message: "password is not correct"
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn : "3h"});

    res.status(200).json({
      message: "Login success",
      token,
      username: user.username,
      email : user.email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
