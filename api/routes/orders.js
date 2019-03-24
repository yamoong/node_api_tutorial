const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/chack-auth");

const OrderController = require("../controllers/orders");

const Order = require("../models/order");
const Product = require("../models/product");

// Handle incoming GET requests to /orders
router.get("/", OrderController.orders_get_all);

router.post("/", checkAuth, OrderController.orders_create_order);

router.get("/:orderId", checkAuth, OrderController.orders_get_order);

router.delete("/:orderId", checkAuth,OrderController.orders_delete_order);

module.exports = router;
