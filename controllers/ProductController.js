const {Product, Category} = require("../models/index")

const ProductController = {

    async productCreate(req,res){
        try {
            const product = await Product.create(req.body);

            await product.addCategory(req.body.CategoryId)

            res.status(201).send({msh:"producto creado", product})

        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... ", error})
        }
    },


}


module.exports = ProductController;