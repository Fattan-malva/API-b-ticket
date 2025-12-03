const { sql, getPool } = require('../Config/db');

class TrxItem {
    static async getTrxItemsByDept(department) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('department', sql.VarChar, department)
                .query('SELECT * FROM TrxItem WHERE Department = @department');

            return result.recordset;
        } catch (error) {
            console.error('Error fetching transactions by department:', error);
            throw error;
        }
    }

    static async createTrxItem(data) {
        try {
            const pool = await getPool();
            
            // Konversi ke waktu Indonesia (UTC+7)
            let trxDate;
            if (data.TrxDate) {
                // Jika dari Flutter mengirim ISO string dengan offset
                const date = new Date(data.TrxDate);
                // Tambah 7 jam untuk konversi ke WIB
                trxDate = new Date(date.getTime() + (7 * 60 * 60 * 1000));
            } else {
                // Jika tidak ada tanggal, gunakan waktu server dengan offset WIB
                trxDate = new Date(Date.now() + (7 * 60 * 60 * 1000));
            }

            const result = await pool.request()
                .input('TrxID', sql.VarChar(50), data.TrxID)
                .input('Department', sql.VarChar(50), data.Department)
                .input('TrxDate', sql.DateTime, trxDate)
                .input('Quantity', sql.Int, data.Quantity)
                .input('SubTotal', sql.Decimal(18, 0), data.SubTotal)
                .input('TotalPrice', sql.Decimal(18, 0), data.TotalPrice)
                .input('Cash', sql.Decimal(18, 0), data.Cash)
                .input('Change', sql.Decimal(18, 0), data.Change)
                .input('PaymentMethod', sql.VarChar(50), data.PaymentMethod)
                .input('Remark', sql.VarChar(50), data.Remark)
                .input('CreatedBy', sql.VarChar(50), data.CreatedBy)
                .query(`
                    INSERT INTO TrxItem (
                        TrxID, Department, TrxDate, Quantity,
                        SubTotal, TotalPrice, Cash, Change,
                        PaymentMethod, Remark
                    ) VALUES (
                        @TrxID, @Department, @TrxDate, @Quantity,
                        @SubTotal, @TotalPrice, @Cash, @Change,
                        @PaymentMethod, @Remark , @CreatedBy
                    )
                `);

            return result.rowsAffected;
        } catch (error) {
            console.error('Error inserting TrxItem:', error);
            throw error;
        }
    }
}

module.exports = TrxItem;