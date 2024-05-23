import Propiedad from './Propiedad.js'
import Precio    from './Precio.js'   
import Categoria from './Categoria.js'
import Usuario   from './Usuarios.js' 

//Precio.hasOne(Propiedad)  //traduccion una  propiedad tiene un precio osea se lee alrevez
Propiedad.belongsTo(Precio, { foereignKey : 'LlaveForanea'});
Categoria.hasOne(Propiedad)
Propiedad.belongsTo(Usuario, { foereignKey : 'UserId'})


export{
    Propiedad,
    Precio,
    Categoria, 
    Usuario
}




