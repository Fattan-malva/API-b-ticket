const MstTax = require('../Models/M.MstTax');

const getAllTax = async (req, res) => {
    try {
        const items = await MstTax.getAllTax();
        res.json(items);
    } catch (error) {
        console.error('Error fetching all tax:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllTax };
