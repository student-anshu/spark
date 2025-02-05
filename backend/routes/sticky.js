const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/auth");
const Sticky = require("../models/Sticky");

// Create a new sticky note
// Create sticky route
router.post('/stickies', authenticate, async(req, res) => {
    const { title, description, color } = req.body;

    const sticky = new Sticky({
        title,
        description,
        color,
        userId: req.userId, // Assuming you use the authenticated user
    });

    try {
        await sticky.save();
        res.status(201).json({ message: 'Sticky note created successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get all sticky notes
router.get('/', async(req, res) => {
    try {
        const stickies = await Sticky.find().populate('tasks'); // populate tasks if needed
        res.json(stickies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sticky notes" });
    }
});


// Edit sticky note
router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const { title, description, color } = req.body;
    try {
        const sticky = await Sticky.findByIdAndUpdate(id, { title, description, color }, { new: true });
        res.json(sticky);
    } catch (error) {
        res.status(500).json({ message: "Error updating sticky note" });
    }
});

module.exports = router;