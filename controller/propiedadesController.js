import {  unlink } from 'node:fs/promises'
import { validationResult } from "express-validator";
import { Precio, Categoria, Propiedad } from "../models/index.js"



const admin = async (req, res) =>{

    const {id} = req.usuario

    const propiedades = await Propiedad.findAll({
        where:{
            UsuarioId : id
        },
        include: [
            {model: Categoria, as:'categoria'},
            {model: Precio, as:'precio'}
        ]

        })

    res.render('propiedades/admin',{
        pagina: 'Mis Propiedades',
        propiedades,
        csrfToken: req.csrfToken(),
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

        //Extraer datos 

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

        if( req.usuario.id.toString() !== propiedad.usuarioId.toString()){
            return  res.redirect('/mis-propiedades');
        }

      
        res.render('propiedades/agregar-imagen',{
            pagina:`Agregar Imagen ${propiedad.titulo} `,
            csrfToken: req.csrfToken(),
            propiedad
        })
    }


    const almacenarImagen = async (req, res, next)  => {
   
        
     //Extraer datos 

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

        if( req.usuario.id.toString() !== propiedad.usuarioId.toString()){
            return  res.redirect('/mis-propiedades');
        }


        try {
           //console.log(req.file)
             //Almacenar Imagen y Publicar Propiedad 
             propiedad.Imagen = req.file.filename
             propiedad.publicado = 1

             await propiedad.save()
             
             next()


        } catch (error) {
            console.error('Error al guardar la propiedad:', error.message);
        }

    }

    const editar = async (req,res) =>{

            const {id} = req.params

            //Validar que la Propiedad Exista:

            const propiedad = await Propiedad.findByPk(id);

            if(!propiedad){
                return  res.redirect('/mis-propiedades');
            }

           //Comprobar que la Propiedad Pertenece a quien visita esta pagina

        if( propiedad.usuarioId.toString() !== req.usuario.id.toString()){
            return  res.redirect('/mis-propiedades');
        }

          //Consultar Modelo de Precio y Categoria 
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
    
        res.render('propiedades/editar', {
            pagina: ` Editar Propiedad ${propiedad.titulo}`,
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            datos: propiedad
        })

    }

    const guardarCambios = async (req, res) => {

      let resultado = validationResult(req)

      if(!resultado.isEmpty()){

         // Consultar Modelo de Precio y Categorias
                const [categorias, precios] = await Promise.all([
                    Categoria.findAll(),
                    Precio.findAll()
                ])


            
           return  res.render('propiedades/editar', {
                    pagina: 'Editar Propiedad',
                    csrfToken: req.csrfToken(),
                    categorias,
                    precios,
                    errores : resultado.array(),
                    datos: req.body
                })

             }

             const {id} = req.params

              // Validar que la propiedad exista
            const propiedad = await Propiedad.findByPk(id)

            if(!propiedad) {
                return res.redirect('/mis-propiedades')
            }

            // Revisar que quien visita la URl, es quien creo la propiedad
            if(propiedad.usuarioId.toString() !== req.usuario.id.toString() ) {

                return res.redirect('/mis-propiedades')
            }


        /////////////Reescribir el Objeto////////////////
        try {
            const  { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria :categoriaId} = req.body

            propiedad.set({
                titulo,
                descripcion,
                habitaciones,
                estacionamiento,
                wc,
                calle,
                lat,
                lng,
                precioId,
                categoriaId
            })

            await propiedad.save();

            res.redirect('/mis-propiedades');
            
        } catch (error) {
            console.log(error); 
            
        }

    }

    const eliminar = async (req,res) =>{

        ///Validacion



        //Consultar la Base de Datos Mediante  "  ID "

        const {id} = req.params

        //Validar que la Propiedad Exista:

        const propiedad = await Propiedad.findByPk(id);

        if(!propiedad){
            return  res.redirect('/mis-propiedades');
        }

       //Comprobar que la Propiedad Pertenece a quien visita esta pagina

    if( propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return  res.redirect('/mis-propiedades');
     }

     //Eliminar Imagen
     await unlink(`public/uploads/${propiedad.Imagen}` )

     console.log(`Se Elimino La Imagen ${propiedad.Imagen}`)
     
     //Eliminar Propiedad:

     await propiedad.destroy()
     res.redirect('/mis-propiedades')




    }




export{
     admin, 
    crear, 
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar
 }