import {exit} from 'node:process'
import cateogrias from './categorias.js'
import precios from './precios.js'
import usuarios from './usuarios.js'
import db from  '../config/db.js'
import { Categoria, Precio, Usuario } from  '../models/index.js'

const importarDatos   = async () => {
    try{
        //Autenticar
        await db.authenticate()
        //Generar Columnas
        await db.sync()
        //Insertar Datos 
        await Promise.all([
            Categoria.bulkCreate(cateogrias),
            Precio.bulkCreate(precios),
           Usuario.bulkCreate(usuarios)
         ]);
        
      
        console.log("Datos importados Correctamente ");
        exit()
    }catch(error){
        console.log(error);
        exit(1)
    }
}


const eliminarDatos = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos Eliminados Correctamente');
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

    if(process.argv[2] === "-i") {
        importarDatos();
    }

    if(process.argv[2] === "-e") {
        eliminarDatos();
    }
