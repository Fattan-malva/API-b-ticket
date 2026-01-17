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

        // Log incoming data for debugging
        console.log('Incoming TrxItem data:', JSON.stringify(data, null, 2));

        await TrxItem.createTrxItem(data);

        res.status(201).json({
            message: 'Transaction item created successfully'
        });
    } catch (error) {
        console.error('Error creating trx item:', error);
        
        // Jika error karena validasi, kirim status 400 dengan pesan yang jelas
        if (error.message.includes('is required') || error.message.includes('cannot be empty')) {
            return res.status(400).json({ 
                message: 'Validation error', 
                error: error.message 
            });
        }
        
        // Untuk error database lainnya
        res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
    }
};

module.exports = { 
    getTrxItemsByDept,
    createTrxItem 
};
