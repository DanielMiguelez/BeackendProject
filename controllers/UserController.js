const {User} = require ("../models/index")

const UserController = {

    async createUser(req,res){
        try {
            const usuario = await User.create(req.body)

            res.status(201).send({msg:"usuario creado", usuario})

        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"hubo un problema... ", error})
        }
    }

}

module.exports = UserController;