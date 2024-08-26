import  express  from  'express';
import userRutas from './routes/userRutas.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import csrf from 'csurf'
import cookieParser from 'cookie-parser';
import db from './config/db.js';






//crear la app
const app = express()

// Configuración de CSP
//app.use((req, res, next) => {
 // res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-eval'");
 // next();
//});

// Habilitar lectura de Datos de formularios:
app.use(express.urlencoded({extended: true}))

// Habilitar cookie parser:
app.use( cookieParser() )

//Habilitar CSRF
app.use( csrf({cookie:true}) )

// Conexion a la base de Datos
try {
  await  db.authenticate();
  db.sync()
 console.log('conexion correcta a la base de  datos')
}catch (error) {
  console.log(error)
}

//habilitar pug
app.set('view engine', 'pug');
app.set('views', './views');



app.use(express.static('public'));
app.use('/out', userRutas);
app.use('/', propiedadesRoutes);

const port = process.env.PORT || 3000;

app.listen( 3000,  () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});




