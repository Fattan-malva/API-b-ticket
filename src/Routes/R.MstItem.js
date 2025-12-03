const express = require('express');
const { getItemsByDept } = require('../Controllers/C.MstItem');

const router = express.Router();

// GET /items/:dept - Get items by department (ktv or oppai)
router.get('/:dept', getItemsByDept);


module.exports = router;
