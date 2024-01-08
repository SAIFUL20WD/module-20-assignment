const express = require("express");
const router = express.Router();
const {createSales, totalRevenue, quntityByProduct, topProduct, averagePrice, revenueByMonth, highestQuantitySold, departmentSalaryExpense} = require("../controllers/SalesController");

// Sales 
router.get("/total-revenue", totalRevenue);
router.get("/quantity-by-product", quntityByProduct);
router.get("/top-products", topProduct);
router.get("/average-price", averagePrice);
router.get("/revenue-by-month", revenueByMonth);
router.get("/highest-quantity-sold", highestQuantitySold);
router.get("/department-salary-expense", departmentSalaryExpense);
// For Dummy Data
router.post("/create-sales", createSales);

module.exports = router;