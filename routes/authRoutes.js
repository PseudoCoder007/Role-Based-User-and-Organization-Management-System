const express = require('express');
const { signupUser, loginUser } = require('../controllers/authController');

const auth_router = express.Router();

auth_router.post('/signup-user', signupUser);
auth_router.post('/login-user', loginUser);

module.exports = auth_router;
