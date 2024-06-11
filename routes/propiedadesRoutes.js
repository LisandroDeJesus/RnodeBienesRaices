import express from 'express';
import { body } from 'express-validator';
import { admin, crear , guardar} from '../controller/propiedadesController.js';


export const router = express.Router();

// Ruta para ver las propiedades del usuario
router.get('/mis-propiedades', admin);

// Ruta para mostrar el formulario de creación de propiedades
router.get('/propiedades/crear', crear);

router.post('/propiedades/crear',
  body('titulo').notEmpty().withMessage('El título del anuncio es obligatorio'),
  body('descripcion').notEmpty().withMessage('La Descripción no puede ir vacia').isLength({ max: 110 }).withMessage('La Descripción es muy larga'),
body('categoria').isNumeric().withMessage('Selecciona una categoría'),
body('precio').isNumeric().withMessage('Selecciona un rango de Precios'),
body('habitaciones').isNumeric().withMessage('Selecciona la Cantidad de Habitaciones'),
body('estacionamiento').isNumeric().withMessage('Selecciona la Cantidad de Estacionamientos'),
body('wc').isNumeric().withMessage('Selecciona la Cantidad de Baños'),
body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
  guardar
);



export default router;
