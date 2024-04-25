import  express  from  'express'
import { formularioLogin , autenticar, formularioRegistro ,registrar, confirmar , formulariOlvideMiPassword ,resetPassword , comprobarToken , nuevoPassword} from '../controller/usuariosController.js'
const router  = express.Router();

     
//Paso Uno Crear la Ruta hacia donde te va a Redirigir
router.get('/login', formularioLogin)
router.post('/login', autenticar);//nuevo

router.get('/registro', formularioRegistro )

router.post('/registro', registrar )

router.get('/confirmar/:token', confirmar )

router.get('/recuperacion',formulariOlvideMiPassword)
router.post('/recuperacion',resetPassword)


//Almacena el Nuevo Password
router.get('/Recuperacion/:token',comprobarToken)
router.post('/Recuperacion/:token',nuevoPassword)



export default router
    
