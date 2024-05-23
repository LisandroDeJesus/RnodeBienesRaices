import {exit} from 'node:process'
import cateogrias from './categorias.js'
import precios from './precios.js'
import db from  '../config/db.js'
import { Categoria, Precio } from  '../models/index.js'
import { truncate } from 'node:fs'



const importarDatos   = async () => {
    try{
        //Autenticar
        await db.authenticate()
        //Generar Columnas
        await db.sync()
        //Insertar Datos 
        await Promise.all([
            Categoria.bulkCreate(cateogrias),
            Precio.bulkCreate(precios)
         ]);
        
      
        console.log("Datos importados Correctamente ");
        exit()
    }catch(error){
        console.log(error);
        exit(1)
    }
}


const eliminarDatos = async  () => {
    try{
    await Promise.all([
        Categoria.destroy({where: {} , truncate : true }), 
        Precio.destroy({where: {} , truncate : true }), 
     ])
     console.log("Datos Eliminados");
     exit()
    }catch(error){
        console.log(error);
        exit(1)
    }
}

if(process.argv[2] === "-i" ){
    importarDatos();
}

if(process.argv[2] === "-e" ){
    eliminarDatos();
}
