const express = require('express');
const { login } = require('../Auth/A.Auth');

const router = express.Router();

// POST /auth/login
router.post('/login', login);

module.exports = router;
