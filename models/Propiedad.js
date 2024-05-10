import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const  Propiedades  = db.define('propiedades', {
    id : {                                     //1
         type: DataTypes.UUID,                                    
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
     },
     titulo : {
        type: DataTypes.STRING(100),
        allowNull:false
     },
     descripcion : {
        type: DataTypes.TEXT,
        allowNull:false
     },
     habitaciones : {
        type: DataTypes.INTEGER,
        allowNull:false
     },
     Estacionamientos : {
        type: DataTypes.INTEGER,
        allowNull:false
     },
     Estacionamientos : {
        type: DataTypes.INTEGER,
        allowNull:false
     },
     wc: {
        type: DataTypes.INTEGER,
        allowNull:false
     },
     calle:{
        type: DataTypes.STRING(60),
        allowNull:false
     },
     lat:{
        type: DataTypes.INTEGER,
        allowNull:false
     },
     lng:{
        type: DataTypes.INTEGER,
        allowNull:false
     }

     

});

/*

    Documentacion : 

*   Empezamos con la creadios de la tabla proiedades y a partir de la  linea 5 empezamos a definir las caracteriticas del la primera columna
    que es el id como podemos ver definimos el tipo de dato valor por defecto ue no pued ser nulo y finalmente que es llave promaria 



*/
