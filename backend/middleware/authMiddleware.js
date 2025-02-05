const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Get token from the Authorization header

    if (!token) return res.status(401).send({ error: 'Authorization token required' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).send({ error: 'Forbidden' });
        req.userId = user.id;  // Assuming the user object contains the user ID
        next();
    });
};

module.exports = authenticate;