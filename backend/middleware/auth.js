const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];  // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;  // Store the userId from the decoded JWT in the request object
        next();  // Pass the request to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = authenticateUser;
