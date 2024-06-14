import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const  Propiedad  = db.define('propiedades', {
    id : {                                     
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
     estacionamiento: {
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
     },
     Imagen:{
         type: DataTypes.STRING,
         allowNull:false
     },
     publicado:{
      type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
     }

     

});

export default Propiedad;

/*

    Documentacion : 

*   Empezamos con la creadios de la tabla proiedades y a partir de la  linea 5 empezamos a definir las caracteriticas del la primera columna
    que es el id como podemos ver definimos el tipo de dato valor por defecto ue no pued ser nulo y finalmente que es llave promaria 

    Inicialmente definimos las columnas autonomas que no van a depender de tablas externas o modelos externos para mostrar informacion 

    Absolutamente todo lo que podemos ver dentro del objeto despues de propiedades se trata de los titulos se tratan de las columnas  los 

    objetos dentro de dichas columnas se trata de que  contienen dichas columnas el tipo de datos condiciones  o valores por defecro en caso 
    
    que posean uno 



*/
