const mongoose = require('mongoose');

const stickySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, default: 'yellow' }, // color to represent sticky note, default to yellow
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // Store task IDs
}, { timestamps: true });

const Sticky = mongoose.model('Sticky', stickySchema);
module.exports = Sticky;