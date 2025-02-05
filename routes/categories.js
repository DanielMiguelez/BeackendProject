const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");

router.post("/createCategory", CategoryController.createCategory)
router.put("/updateCategory/:id", CategoryController.updateCategory)
router.delete("/destroyCategory/:id", CategoryController.destroyCategory)
router.get("/getCategoriesProducts", CategoryController.getCategoriesProducts)

module.exports = router;