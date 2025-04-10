const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        next();
    });
};

const adminMiddleware = async (req, res, next) => {
    const user = await User.findByPk(req.userId);
    
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Requires admin role' });
    }

    next();
};

module.exports = {
    authMiddleware,
    adminMiddleware,
};