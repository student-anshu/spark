const express = require('express');
const { signup, signin } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authenticate, (req, res) => {
    res.json({ msg: "User authenticated", userId: req.user.id });
});

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;