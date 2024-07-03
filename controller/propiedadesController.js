import { validationResult } from "express-validator";
import { Precio, Categoria, Propiedad } from "../models/index.js"
//import protegerRuta from "../midleware/protejerRuta.js";


const admin = (req, res) =>{
    res.render('propiedades/admin',{
        pagina: 'Mis Propiedades'
    })
}

// Formulario para crear una nueva propiedadgit 
const crear = async (req, res) => {
    // Consultar Modelo de Precio y Categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/crear', {
        pagina: 'Crear Propiedad',
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {} //mantener datos ingresados
    })
}

const guardar = async (req, res) => {

    // Validación
    let resultado = validationResult(req)
    if(!resultado.isEmpty()) {

        // Consultar Modelo de Precio y Categorias
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

        return res.render('propiedades/crear', {
            pagina: 'Crear Propiedad',
            csrfToken: req.csrfToken(),
            categorias,
            precios, 
            errores: resultado.array(),
            datos: req.body //Mantener Datos Ingresados
        })
    }


        //Crear un registro :
    const  { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria :categoriaId} = req.body 
    
    const {id : usuarioId} = req.usuario;
    

    try {

        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId,
            usuarioId,
            Imagen: ''
        })

        const { id } = propiedadGuardada 
        res.redirect(` /propiedades/agregar-imagen/${id} `)
        
        } catch (error) {
            console.log(error);
        }

    }

    const agregarImagen = async (req,res) => {


    
      const {id} =  req.params
      
      //Validar que la Propiedad Exista:

        const propiedad = await Propiedad.findByPk(id);

        if(!propiedad){
            return  res.redirect('/mis-propiedades');
        }

       
      //Comprobar que la Propiedad no este Publicada

        if(propiedad.publicado){
            return  res.redirect('/mis-propiedades');
        }  
        
      

      //Comprobar que la Propiedad Pertenece a quien visita esta pagina
        console.log(req.usuario);

      res.render('propiedades/agregar-imagen',{
        pagina:'Agregar Imagen',
        propiedad
    })
    }



export{
     admin, 
    crear, 
    guardar,
    agregarImagen
 }