const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require('path')

// Import routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const listRoutes = require("./routes/list");
const sticky = require("./routes/sticky");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const _dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5000/", // Frontend URL
    credentials: true // Allow sending cookies
}));

// Connect to MongoDB

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/stickies", sticky);
// backend/server.js
app.use('/lists', listRoutes); // This ensures that /lists routes are handled correctly

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));