import  jwt from 'jsonwebtoken'
import { Usuario }   from '../models/index.js'


const protegerRuta = async  (req, res, next) => {

    //Verificar Si Hay Token:

    const {_token} = req.cookies
    if(!_token){
        return res.redirect('/out/login')
    }

    //Comprobar dicho Token:

    try {
        const decoded  = jwt.verify(_token, process.env.JWT_SECRET) 
        const usuario = await  Usuario.scope('eliminarPassword').findByPk(decoded.id);
       //Almacenar Usuario:
        if(usuario){
            req.usuario = usuario
        }else{
            return res.redirect('out/login')
        }
            return next();
        } catch (error) {
         return res.clearCookie('_token').redirect('/out/login')
        }

}

export default protegerRuta;