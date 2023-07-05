import db from '../model/dbmodel.js';

export const getSalesReport = async (req, res) => {
    const { interval } = req.query;
    let sqlQuery;
    if (interval === 'day') {
        sqlQuery = 'SELECT DATE(orderDate) AS date, SUM(totalAmount) AS totalSales FROM orders GROUP BY date';
    } else if (interval === 'week') {
        sqlQuery = 'SELECT YEARWEEK(orderDate) AS week, SUM(totalAmount) AS totalSales FROM orders GROUP BY week';
    } else if (interval === 'month') {
        sqlQuery = 'SELECT DATE_FORMAT(orderDate, "%Y-%m") AS month, SUM(totalAmount) AS totalSales FROM orders GROUP BY month';
    } else {
        return res.status(400).json({
            message: 'Invalid interval parameter. Valid values are "day", "week", or "month".'
        });
    }
    try {
        const [rows] = await db.promise().execute(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while generating the sales report.'
        });
    }
};
