const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.post("/createProduct", ProductController.productCreate)
router.put("/productUpdate/:id", ProductController.productUpdate)
router.delete("/destroyProduct/:id", ProductController.destroyProduct)
router.get("/getAllProductsWithCategories", ProductController.getAllProductsWithCategories)


module.exports = router;