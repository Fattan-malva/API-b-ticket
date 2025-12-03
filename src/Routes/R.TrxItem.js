const express = require('express');
const { 
    getTrxItemsByDept,
    createTrxItem
} = require('../Controllers/C.TrxItem');

const router = express.Router();

// GET by department
router.get('/:dept', getTrxItemsByDept);

// POST - create transaction
router.post('/', createTrxItem);

module.exports = router;
