const { sql, getPool } = require('../Config/db');

class MstTax {
    static async getAllTax() {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .query('SELECT * FROM MstTax');

            return result.recordset;
        } catch (error) {
            console.error('Error fetching all items:', error);
            throw error;
        }
    }
}

module.exports = MstTax;
