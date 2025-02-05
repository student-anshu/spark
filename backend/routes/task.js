const express = require("express");
const Task = require("../models/Task");
const List = require("../models/List"); // Assuming you have a List model
const authenticate = require("../middleware/auth");
const router = express.Router();
const schedule = require("node-schedule");

// Create task route
router.post("/create", authenticate, async(req, res) => {
    console.log("Received request body:", req.body); // Log request body

    const { title, description, listId, dueDate, priority, completed } = req.body;
    const userId = req.userId;

    if (!listId) {
        return res.status(400).json({ error: "List ID is required." });
    }

    try {
        // Check if the list exists
        const list = await List.findById(listId);
        if (!list) {
            return res.status(400).json({ error: "List not found." });
        }

        console.log("Parsed dueDate:", dueDate); // Log parsed dueDate

        const task = new Task({
            userId,
            title,
            description,
            listId,
            dueDate: dueDate ? new Date(dueDate) : null, // Ensure it's converted properly
            priority,
            completed,
        });

        await task.save();
        res.status(201).json({ message: "Task created successfully!" });
    } catch (error) {
        console.error("Error saving task:", error); // Log errors for debugging
        res.status(400).json({ error: error.message });
    }
});


// Get all tasks for a user (with pagination)
router.get('/', authenticate, async(req, res) => {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query;

    try {
        const tasks = await Task.find({ userId })
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(400).json({ error: "Failed to fetch tasks." });
    }
});
// Get tasks by listId for a specific user
router.get('/task/:listId', authenticate, async(req, res) => {
    const { listId } = req.params; // Get the listId from route parameters

    if (!listId) {
        return res.status(400).json({ error: 'listId is required' });
    }

    try {
        // Log to check the values
        console.log("Authenticated user ID:", req.userId);
        console.log("List ID requested:", listId);

        // Check if the list exists and belongs to the authenticated user
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        if (list.userId.toString() !== req.userId.toString()) {
            console.log("User does not have permission to access this list");
            return res.status(403).json({ error: 'You do not have permission to view tasks for this list' });
        }

        // Find tasks that belong to the specified listId and the authenticated user
        const tasks = await Task.find({ listId, userId: req.userId });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ error: 'No tasks found for this list' });
        }

        res.status(200).json({ tasks }); // Respond with the tasks
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: 'Server error' });
    }
});




// Update a task
router.put("/:id", authenticate, async(req, res) => {
    try {
        const { title, description, dueDate, priority, listId, completed } = req.body;


        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                priority,
                completed,
                listId,
            }, { new: true }
        );

        if (!updatedTask) return res.status(404).json({ message: "Task not found" });

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a task (soft delete example)
router.delete("/:id", authenticate, async(req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) return res.status(404).json({ message: "Task not found" });

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// Automatically delete overdue tasks every 24 hours
schedule.scheduleJob("0 0 * * *", async() => {
    try {
        const now = new Date();
        await Task.deleteMany({ dueDate: { $lt: now } });
        console.log("Deleted overdue tasks successfully.");
    } catch (error) {
        console.error("Error deleting overdue tasks:", error);
    }
});

module.exports = router;