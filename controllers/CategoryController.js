const {Category, Product} = require("../models/index");

const CategoryController = {

    async createCategory(req,res){
        try {
            const category = await Category.create(req.body);
            res.send({mes:"category created", category})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... ", error})
        }
    },

    async updateCategory(req,res){
        try {
            await Category.update(req.body, {
                where:{
                    id:req.params.id
                }
            })
            .then(category => res.status(201).send({ msg: "actualizada la categoria" }))
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... ", error})
        }
    },

    async destroyCategory(req,res){
        try {
            await Category.destroy({
                where: {
                    id : req.params.id
                }
            })
            .then(category => res.status(200).send({msg:"se ha eliminado la categoria", category}))
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... ", error})
        }
    },

    async getCategoriesProducts (req,res){
        try {
            const categories = await Category.findAll({
                include: [{
                    model: Product,  // ✅ Asegura que es el modelo correcto
                    as: 'products',  // ✅ Usa el alias definido en el `belongsToMany`
                    attributes: ['name'],
                    through: { attributes: [] }
                }]
            })
            res.send({msg:"categorias : " , categories})

        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... "})
        }
    }

}

module.exports = CategoryController;