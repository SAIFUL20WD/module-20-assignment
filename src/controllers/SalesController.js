const SalesModel = require("../models/SalesModel");

exports.createSales = async (req, res) => {
    try {
        const result = new SalesModel(req.body);
        await result.save();
        res.status(200).json({status: "success", msg: "Data inserted successfully"});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.totalRevenue = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: { $multiply: ["$quantity", "$price"] },
                    },
                },
            },
        ]);
        res.status(200).json({ totalRevenue: result[0].totalRevenue });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.quntityByProduct = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: "$product",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.topProduct = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: "$product",
                    totalRevenue: {
                        $sum: { $multiply: ["$quantity", "$price"] },
                    },
                },
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 5 },
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.averagePrice = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: null,
                    averagePrice: { $avg: "$price" },
                },
            },
        ]);
        res.status(200).json({ averagePrice: result[0].averagePrice });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.revenueByMonth = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                    },
                    totalRevenue: {
                        $sum: { $multiply: ["$quantity", "$price"] },
                    },
                },
            },
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.highestQuantitySold = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            { $sort: { quantity: -1 } },
            { $limit: 1 },
        ]);
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.departmentSalaryExpense = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: "$department",
                    totalSalaryExpense: {
                        $sum: { $multiply: ["$quantity", "$price"] },
                    },
                },
            },
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
