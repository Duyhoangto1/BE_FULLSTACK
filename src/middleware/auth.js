const jwt = require('jsonwebtoken');
const { create } = require('../models/user');
require('dotenv').config();

const auth = (req, res, next) => {
    const whiteList = [
        "/",
        "/login",
        "/register"
    ];

    // Check if the request URL is in the whitelist
    if (whiteList.find(item => '/v1/api' + item === req.originalUrl)) {
        return next();
    }

    // Check if the authorization header exists
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]; // Extract the token
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token321 :", decoded);
            req.user = {
                email : decoded.email,
                name : decoded.name,
                createdAt : "duyhoangto",
            }; // Attach decoded token to the request object
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};

module.exports = auth;