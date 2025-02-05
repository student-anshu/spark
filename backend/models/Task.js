const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true }, // Use listId here
    dueDate: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;