import express from 'express'
import { inicio, categoria , buscador , noEncontrado } from "../controller/appController.js";

const router = express.Router()



//Pagina de Inicio

router.get('/',inicio)

//Pagina Categorias

router.get('/categoria:id',categoria)


//Pagina 404
router.post('/404', noEncontrado)

//Buscardor
router.post('/buscador', buscador)



export default router;