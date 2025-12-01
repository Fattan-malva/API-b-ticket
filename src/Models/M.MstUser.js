const { sql, getPool } = require('../Config/db');

class User {
    static async findByUsername(username) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('username', sql.VarChar, username)
                .query('SELECT userID, name, username, password, role FROM MstUser WHERE username = @username');

            if (result.recordset.length > 0) {
                return result.recordset[0];
            }
            return null;
        } catch (error) {
            console.error('Error finding user by username:', error);
            throw error;
        }
    }
}

module.exports = User;
