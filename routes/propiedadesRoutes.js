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
  guardar
);



export default router;
