const {Product, Category, CategoryProduct, sequelize } = require("../models/index")

const ProductController = {

    async productCreate(req,res){
        try {
            const product = await Product.create({...req.body, UserId:req.user.id});

            await product.addCategory(req.body.CategoryId)

            res.status(201).send({msh:"producto creado", product})

        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... ", error})
        }
    },

    async productUpdate(req,res){
        try {

            const product = await Product.findByPk(req.params.id)

            if (!product) {
                return res.status(404).send({ msg: "Producto no encontrado" });
            }

            await Product.update(req.body,{
                where:{
                    id:req.params.id
                }
            })

            if (req.body.CategoryIds) {  
                await product.setCategories(req.body.CategoryIds);  // Debe ser un ARRAY
            }
           
            const updatedProduct = await Product.findByPk(req.params.id, { include: { model: Category, as: 'categories' } });

            res.send({ msg: "ACTUALIZADO CON ÉXITO", product: updatedProduct });

        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... ", error})
        }
    },

    async destroyProduct(req,res){
        try {
            const productoEliminar = await Product.findByPk(req.params.id)
            if(!productoEliminar){
                res.status(404).send({msg:"no se ha encontrado.."})
            }

            await sequelize.models.CategoryProduct.destroy({
                where: { ProductId: req.params.id }
            });


            await Product.destroy({
                where:{
                    id:req.params.id
                }
            })

            res.send({msg:"producto eliminado", producto: productoEliminar})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... ", error})
        }
    },

    async getAllProductsWithCategories(req,res){
        try {
            const products = await Product.findAll({
                include: [{
                    model:Category,
                    as: 'categories', 
                    attributes: ['name'],
                    through: { attributes: [] }
                }]
            })
            res.send({msg:"products", products})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... "})
        }
    },

    async getProductById (req,res){
        try {
            const product = await Product.findOne({
                where:{
                    id:req.params.id
                }
            })
            res.status(200).send({msg:"encontrado", product})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... "})
        }
    },

    async getProductByName(req,res){
       try {
        const producto = await Product.findOne({
            where:{
                name:req.params.name
            }
        })

        if (!producto) {
            return res.status(404).send({ msg: "Producto no encontrado" });
        }

        res.status(200).send({msg:"encontrado", producto})
       } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... "})
       }
    },

    async getProductByPrice(req,res){
        try {
            const product = await Product.findAll({
                where:{
                    price:req.params.price
                }
            })
            if (!product) {
                return res.status(404).send({ msg: "Producto no encontrado" });
            }
    
            res.status(200).send({msg:"encontrado", product})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... "})
        }
    },

    async productsOrdered (req,res){
        try {
            const productsOrdered = await Product.findAll({
                order: [
                    ['price', 'DESC']
                ]
            })
            res.status(200).send({msg:"productos ordenados", productsOrdered})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... "})
        }
    }




}


module.exports = ProductController;