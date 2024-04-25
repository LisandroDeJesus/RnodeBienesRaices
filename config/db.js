import  Sequelize  from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path : '.env'})

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER,
     process.env.BD_PASSWORD,{
    host: process.env.BD_HOST,
    port: 3306,
    dialect: 'mysql',
    define:{
        timestaps: true 
    },
    pool: {
        max: 5,
        min :0,
        acquire: 30000,
        idle:   10000
    },
    operatorAliasses: false
});


 export default db; 
