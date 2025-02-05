const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register route
router.post("/signup", async(req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "48h" });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

// Login route
router.post("/signin", async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "48h" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

module.exports = router;