const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.post("/createProduct", ProductController.productCreate)
router.put("/productUpdate/:id", ProductController.productUpdate)
router.delete("/destroyProduct/:id", ProductController.destroyProduct)
router.get("/getAllProductsWithCategories", ProductController.getAllProductsWithCategories)
router.get("/getProductById/:id", ProductController.getProductById)
router.get("/getProductByName/:name", ProductController.getProductByName)
router.get("/getProductByPrice/:price", ProductController.getProductByPrice)
router.get("/productsOrdered", ProductController.productsOrdered)

module.exports = router;