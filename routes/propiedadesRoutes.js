import express from 'express';
import { admin , crear } from '../controller/propiedadesController.js'
const router = express.Router();

router.get('/mis-propiedades', admin)
router.get('/propiedades/crear', crear)


export default router