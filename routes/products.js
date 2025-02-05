const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.post("/createProduct", ProductController.productCreate)


module.exports = router;