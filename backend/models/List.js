const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: String,
    color: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('List', ListSchema);