import Precio from "../models/Precio.js"
import Categoria from "../models/Categoria.js"
import csurf from "csurf"
import { validationResult } from "express-validator"
import precios from "../seed/precios.js"


const admin = (req,res) => {
    res.render("propiedades/admin",
    {
        pagina:"mis propiedades",
        barra:true
    })
}

// Formulario Para Crear Nueva Propiedad :

const  crear = async (req,res) => {
    //Consultar Modelo de Precio y Categorias :
    const [ categorias, precios] =  await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render("propiedades/crear",{
        pagina:"Ingrese su Propiedad",
        barra:true,
        csrfToken:req.csrfToken(),
        categorias,
        precios
    })
}

//Guardar formulario

const guardar =  async (req,res) => {

    let resultado = validationResult(req)  

    if(!resultado.isEmpty()){

                                           //Consultar Modelo y Categorias:

        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

        return res.render('propiedades/crear',{
            pagina:'Ingrese su Propiedad',
            barra:true,
            categorias,
            precios,
            errores: resultado.array()
        })
    } 

}



export{
    admin,
    crear,
    guardar
}