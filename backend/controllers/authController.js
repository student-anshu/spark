const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Signup
exports.signup = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// User Signin
exports.signin = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({ msg: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};