const MstItem = require('../Models/M.MstItem');

const getItemsByDept = async (req, res) => {
    try {
        const { dept } = req.params;
        const items = await MstItem.getItemsByDept(dept);
        res.json(items);
    } catch (error) {
        console.error('Error fetching items by dept:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllItems = async (req, res) => {
    try {
        const items = await MstItem.getAllItems();
        res.json(items);
    } catch (error) {
        console.error('Error fetching all items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getItemsByDept, getAllItems };
