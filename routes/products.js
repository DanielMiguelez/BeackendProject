const express = require("express");
const router = express.Router();
const {authentication, isAdmin} = require ("../middleware/authentication")

const ProductController = require("../controllers/ProductController");

router.post("/createProduct",authentication,ProductController.productCreate)
router.put("/productUpdate/:id",authentication, ProductController.productUpdate)
router.delete("/destroyProduct/:id",authentication,isAdmin, ProductController.destroyProduct)
router.get("/getAllProductsWithCategories", ProductController.getAllProductsWithCategories)
router.get("/getProductById/:id", ProductController.getProductById)
router.get("/getProductByName/:name", ProductController.getProductByName)
router.get("/getProductByPrice/:price", ProductController.getProductByPrice)
router.get("/productsOrdered", ProductController.productsOrdered)

module.exports = router;