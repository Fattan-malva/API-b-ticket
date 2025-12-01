const express = require('express');
const { getAllTax } = require('../Controllers/C.MstTax');

const router = express.Router();

// GET /items - Get all items
router.get('/', getAllTax);

module.exports = router;
