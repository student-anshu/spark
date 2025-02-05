const express = require("express");
const List = require("../models/List");
const authenticateUser = require("../middleware/authenticateUser.js"); // Corrected import here
const router = express.Router();

// Get all lists for the authenticated user
router.get("/", authenticateUser, async(req, res) => { // Use authenticateUser here
    try {
        const lists = await List.find({ userId: req.userId }); // Fetch lists for the logged-in user
        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: "Error fetching lists", error });
    }
});

router.post("/", authenticateUser, async(req, res) => { // Ensure this uses the authenticateUser middleware
    const { name, color } = req.body;

    try {
        const newList = new List({
            name,
            color,
            userId: req.userId // Associate list with the authenticated user
        });

        await newList.save();
        res.status(201).json(newList); // Return the newly created list
    } catch (error) {
        res.status(500).json({ message: "Error adding list", error });
    }
});


module.exports = router;