const { sql, getPool } = require('../Config/db');

class TrxItem {
    static async getTrxItemsByDept(department) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('department', sql.VarChar, department)
                .query('SELECT * FROM TrxItem WHERE Department = @department ORDER BY TrxDate DESC');

            return result.recordset;
        } catch (error) {
            console.error('Error fetching transactions by department:', error);
            throw error;
        }
    }

    static async createTrxItem(data) {
        try {
            // Validasi required fields
            if (!data.ItemName || data.ItemName.trim() === '') {
                throw new Error('ItemName is required and cannot be empty');
            }
            
            if (!data.TrxID || data.TrxID.trim() === '') {
                throw new Error('TrxID is required and cannot be empty');
            }
            
            if (!data.Department || data.Department.trim() === '') {
                throw new Error('Department is required and cannot be empty');
            }

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
                .input('ItemName', sql.VarChar(255), data.ItemName)   
                .input('ItemPrice', sql.Decimal(18, 0), data.ItemPrice)
                .input('Quantity', sql.Int, data.Quantity)
                .input('SubTotal', sql.Decimal(18, 0), data.SubTotal)
                .input('TaxPrice', sql.Decimal(18, 0), data.TaxPrice)
                .input('TotalPrice', sql.Decimal(18, 0), data.TotalPrice)
                .input('Cash', sql.Decimal(18, 0), data.Cash)
                .input('Change', sql.Decimal(18, 0), data.Change)
                .input('PaymentMethod', sql.VarChar(50), data.PaymentMethod)
                .input('Remark', sql.VarChar(255), data.Remark)
                .input('CreatedBy', sql.VarChar(50), data.CreatedBy)
                .query(`
                    INSERT INTO TrxItem (
                        TrxID, Department, TrxDate, ItemName, Quantity,
                        ItemPrice, TaxPrice, SubTotal, TotalPrice,
                        Cash, Change, PaymentMethod, Remark, CreatedBy
                    ) VALUES (
                        @TrxID, @Department, @TrxDate, @ItemName, @Quantity,
                        @ItemPrice, @TaxPrice, @SubTotal, @TotalPrice,
                        @Cash, @Change, @PaymentMethod, @Remark, @CreatedBy
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