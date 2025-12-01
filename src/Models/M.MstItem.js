const { sql, getPool } = require('../Config/db');

class MstItem {
    static async getItemsByDept(dept) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('dept', sql.VarChar, dept)
                .query('SELECT * FROM MstItem WHERE Dept = @dept');

            return result.recordset;
        } catch (error) {
            console.error('Error fetching items by dept:', error);
            throw error;
        }
    }

    static async getAllItems() {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .query('SELECT * FROM MstItem');

            return result.recordset;
        } catch (error) {
            console.error('Error fetching all items:', error);
            throw error;
        }
    }
}

module.exports = MstItem;
