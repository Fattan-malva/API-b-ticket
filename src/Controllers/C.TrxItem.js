const TrxItem = require('../Models/M.TrxItem');

const getTrxItemsByDept = async (req, res) => {
    try {
        const { dept } = req.params;
        const items = await TrxItem.getTrxItemsByDept(dept);
        res.json(items);
    } catch (error) {
        console.error('Error fetching transactions by dept:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createTrxItem = async (req, res) => {
    try {
        const data = req.body;

        await TrxItem.createTrxItem(data);

        res.status(201).json({
            message: 'Transaction item created successfully'
        });
    } catch (error) {
        console.error('Error creating trx item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { 
    getTrxItemsByDept,
    createTrxItem 
};
