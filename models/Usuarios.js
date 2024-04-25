import { DataTypes, useInflection } from "sequelize";
import bcrypt from "bcrypt";
import db from '../config/db.js';

const Usuario = db.define('usuarios',{
    nombre: {
            type:DataTypes.STRING(30),
            allowNull:false
    },
    email: {
        type:DataTypes.STRING(30),
        allowNull:false
    },
    password: {
        type:DataTypes.STRING(120),
        allowNull:false
    },
    token: DataTypes.STRING,
    confirmado : DataTypes.BOOLEAN
},{
    hooks:{
        beforeCreate: async function(usuario){
            const salt  = await bcrypt.genSalt(10)
            usuario.password = await  bcrypt.hash( usuario.password, salt);
        }
    }
})

//Metodos personalizados :

Usuario.prototype.verificarPassword = function (password) {
    return  bcrypt.compareSync(password, this.password);
}

//sincronizando: 
Usuario.sync({ alter: true })

export default Usuario;