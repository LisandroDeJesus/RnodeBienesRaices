import express from 'express'
import { validationResult } from 'express-validator';
import { body } from 'express-validator';
import { admin , crear , guardar} from '../controller/propiedadesController.js'
const router = express.Router();

router.get('/mis-propiedades', admin)

router.get('/propiedades/crear', crear)


router.post('/propiedades/crear',   
    body('titulo').notEmpty().withMessage('El titulo del Anuncio es Obligatorio'),

guardar

)



export default router