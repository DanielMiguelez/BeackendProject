const { User, Token, Sequelize, Product, Order } = require("../models/index")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/config.json')['development']
const {Op}= Sequelize;

const UserController = {

    async createUser(req, res) {
        try {
            req.body.role = "user";
            const passwordCrypt = bcrypt.hashSync(req.body.password, 10);

            const usuario = await User.create({ ...req.body, password: passwordCrypt })

            res.status(201).send({ msg: "usuario creado", usuario })
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "hubo un problema... ", error })
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();

            if (users.length === 0) {
                return res.status(404).send({ msg: "No hay usuarios registrados" });
            }

            res.status(200).send({ msg: "Lista de usuarios", users });
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "hubo un problema... " })
        }
    },

    async getCurrentUserInfo (){
        try {
            const userId = req.user.id;

            const user = await User.findByPk(userId,{
                attributes:["id", "name", "email"],
                include:[{
                    model:Order,
                    as: 'orders',
                    attributes:['id', 'status'],

                    include:[{
                        model:Product,
                        as:'products',
                        attributes: ["id", "name", "description", "price"],
                        through: { attributes: [] },
                    }]
                }]
            })

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
              }
          
              return res.status(200).json(user);
              
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... "})
        }
    },

    async login(req, res) {
        try {
            const userLogged = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!userLogged) {
                return res.status(401).send({ msg: "no se ha podido loguear" })
            }
            const pwdMatch = bcrypt.compareSync(req.body.password, userLogged.password)
            if (!pwdMatch) {
                return res.status(401).send({ msg: "user or password not correct" })
            }

            let token = jwt.sign({ id: userLogged.id }, jwt_secret);
            Token.create({ token, UserId: userLogged.id })

            res.status(200).send({ msg: "user logged", user: { id: userLogged.id, name: userLogged.name, email: userLogged.email }, token})
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "hubo un problema... ", error })
        }
    },

    async logout(req, res) {

        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization }
                    ]
                }
            });
            res.send({ message: 'Desconectado con éxito' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
        }
    }
}
module.exports = UserController;