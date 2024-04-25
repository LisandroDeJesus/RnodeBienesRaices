

const admin = (req,res) => {
    res.render("propiedades/admin",
    {
        pagina:"mis propiedades",
        barra:true
    })
}

// Formulario Para Crear Nueva Propiedad :

const  crear =   (req,res)=>{
    res.render("propiedades/crear",
    {
        pagina:"Ingrese su Propiedad",
        barra:true,
    })
}



export{
    admin,
    crear
}