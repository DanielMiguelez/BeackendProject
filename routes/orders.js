const express = require("express");
const router = express.Router();
const {authentication, isAdmin} = require ("../middleware/authentication")

const OrderController = require ("../controllers/OrderController");

router.post("/createOrder", authentication, OrderController.createOrder)
router.get("/getOrderById/:id", OrderController.getOrderById)
router.get("/getOrders", OrderController.getOrders)

module.exports = router;