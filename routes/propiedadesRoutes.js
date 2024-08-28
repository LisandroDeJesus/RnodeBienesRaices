import express from 'express';
import { body } from 'express-validator';
import { admin, crear , guardar, agregarImagen, almacenarImagen, editar , guardarCambios, eliminar } from '../controller/propiedadesController.js';
import protegerRuta from '../middleware/protejerRuta.js';
import upload from '../middleware/subirImagen.js';



export const router = express.Router();

// Ruta para ver las propiedades del usuario
router.get('/mis-propiedades', protegerRuta, admin);

// Ruta para mostrar el formulario de creación de propiedades
router.get('/propiedades/crear', protegerRuta, crear);

router.post('/propiedades/crear', protegerRuta,
  body('titulo').notEmpty().withMessage('El título del anuncio es obligatorio'),
  body('descripcion').notEmpty().withMessage('La Descripción no puede ir vacia').isLength({ max: 700 }).withMessage('La Descripción es muy larga'),
  body('categoria').isNumeric().withMessage('Selecciona una categoría'),
  body('precio').isNumeric().withMessage('Selecciona un rango de Precios'),
  body('habitaciones').isNumeric().withMessage('Selecciona la Cantidad de Habitaciones'),
  body('estacionamiento').isNumeric().withMessage('Selecciona la Cantidad de Estacionamientos'),
  body('wc').isNumeric().withMessage('Selecciona la Cantidad de Baños'),
  body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
    guardar
);

router.get('/propiedades/agregar-imagen/:id',
   protegerRuta,
   agregarImagen)

router.post('/propiedades/agregar-imagen/:id',
protegerRuta,
 upload.single('imagen'),//en caso de subir varias imagenes usaremos  ,array en lugar de .single
 almacenarImagen)

 router.get('/propiedades/editar/:id',
  protegerRuta,
  editar
 )

 router.post('/propiedades/editar/:id', protegerRuta,
  body('titulo').notEmpty().withMessage('El título del anuncio es obligatorio'),
  body('descripcion').notEmpty().withMessage('La Descripción no puede ir vacia').isLength({ max: 700 }).withMessage('La Descripción es muy larga'),
  body('categoria').isNumeric().withMessage('Selecciona una categoría'),
  body('precio').isNumeric().withMessage('Selecciona un rango de Precios'),
  body('habitaciones').isNumeric().withMessage('Selecciona la Cantidad de Habitaciones'),
  body('estacionamiento').isNumeric().withMessage('Selecciona la Cantidad de Estacionamientos'),
  body('wc').isNumeric().withMessage('Selecciona la Cantidad de Baños'),
  body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
    guardarCambios
);

router.post('/propiedades/eliminar/:id', 
  protegerRuta,
  eliminar

)
 





export default router;
