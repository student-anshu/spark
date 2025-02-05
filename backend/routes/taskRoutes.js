const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const verifyToken = require('../middleware/verifyToken'); // Token validation middleware
const router = express.Router();

// Create a task
router.post('/create', verifyToken, async(req, res) => {
    const { title, description, list, dueDate, priority } = req.body;
    const userId = req.userId;

    try {
        const task = new Task({
            userId: mongoose.Types.ObjectId(userId),
            title,
            description,
            list,
            dueDate,
            priority
        });

        await task.save();
        res.status(201).json({ message: 'Task created successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;