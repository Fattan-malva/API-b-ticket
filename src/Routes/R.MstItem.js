const express = require('express');
const { getItemsByDept, getAllItems } = require('../Controllers/C.MstItem');

const router = express.Router();

// GET /items/:dept - Get items by department (ktv or oppai)
router.get('/:dept', getItemsByDept);

// GET /items - Get all items
router.get('/', getAllItems);

module.exports = router;
