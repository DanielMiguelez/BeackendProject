const {Order, Product, User} = require("../models/index")

const OrderController = {

    async createOrder(req,res){
        try {
            const {userId, status, productIds} = req.body;

            if(!userId || !status || !Array.isArray(productIds) || productIds.length === 0){
                res.status(400).send({msg:"faltan datos"})
            }
            
            const order = await Order.create({userId, status});

            await order.addProducts(productIds);

            res.status(201).send({msh:"orden creado", order})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al crear el pedido", error });
        }
    },

    async getOrderById(req,res){
        try {
            const orderSelected = await Order.findOne({
                include:[{
                    model:Product,
                    as: 'products',
                    attributes:['name'],
                    through: { attributes: [] }
                }]
            })

            if(!orderSelected){
                res.status(400).send({msg:"la orden seleccionada no existe"});
            }

            res.send({msg:"your order", orderSelected})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... "})
        }
    },

    async getOrders(req,res){
        try {
            const orders = await Order.findAll({
                include: [{
                    model:Product,
                    as:'products',
                    attributes : ['name'],
                    through: { attributes: [] }
                }]
            })
            res.send({msg:"your orders", orders})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... "})
        }
    }

}

module.exports = OrderController;