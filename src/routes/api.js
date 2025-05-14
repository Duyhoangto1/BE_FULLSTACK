const express = require('express');
const { createUser, login } = require('../controllers/user.controller');


const routerAPI = express.Router();

// Basic GET route to test API
routerAPI.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hello world from API'
    })
});

// POST route to create user (without /v1/api since it's already defined in the main app file)
routerAPI.post('/register', createUser);
routerAPI.post('/login', login);
module.exports = routerAPI;
