const {User} = require ("../models/index")
const bcrypt = require ('bcryptjs');

const UserController = {

    async createUser(req,res){
        try {
            req.body.role = "user";
            const passwordCrypt = bcrypt.hashSync(req.body.password, 10);

            const usuario = await User.create({...req.body, password:passwordCrypt})

            res.status(201).send({msg:"usuario creado", usuario})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... ", error})
        }
    },

    async login(req,res){
        try {
            const userLogged = await User.findOne({
                where:{
                    email:req.body.email
                }
            })
            if(!userLogged){
                return res.status(401).send({msg:"no se ha podido loguear"})
            }
            const pwdMatch = bcrypt.compareSync(req.body.password, userLogged.password)
            if(!pwdMatch){
                return res.status(401).send({msg:"user or password not correct"})
            }
            res.status(200).send({msg:"user logged", user: { id: userLogged.id, name: userLogged.name, email: userLogged.email },})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... ", error})
        }
    }

}

module.exports = UserController;