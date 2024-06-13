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
        const usuario = await  Usuario.findByPk(decoded.id)

        console.log(usuario);

    } catch (error) {
        return res.clearCookie('_token').redirect('/out/login')

    }

    next();

}

export default protegerRuta;