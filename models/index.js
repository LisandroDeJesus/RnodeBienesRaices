import Propiedad from './Propiedad.js'
import Precio    from './Precio.js'   
import Categoria from './Categoria.js'
import Usuario   from './Usuarios.js' 

//Precio.hasOne(Propiedad)  //traduccion una  propiedad tiene un precio osea se lee alrevez

Propiedad.belongsTo(Precio, { foreignKey: 'precioId'})
Propiedad.belongsTo(Categoria, { foreignKey: 'categoriaId'})
Propiedad.belongsTo(Usuario, { foreignKey: 'usuarioId'})


export{
    Propiedad,
    Precio,
    Categoria, 
    Usuario
}




