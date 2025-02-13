const express = require("express");
const router = express.Router();

const OrderController = require ("../controllers/OrderController");

router.post("/createOrder", OrderController.createOrder)
router.get("/getOrderById/:id", OrderController.getOrderById)
router.get("/getOrders", OrderController.getOrders)

module.exports = router;