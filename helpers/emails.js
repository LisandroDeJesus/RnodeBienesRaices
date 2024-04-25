import  nodemailer from 'nodemailer'




const emailRegistro = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
        }
        });

        const {email , nombre , token} = datos
        let Binesracies = "BienesRaices";
        //Enviar el email:
    await transport.sendMail({
        from: Binesracies,
        to:  email,
        subject:'Confirma tu Cuenta en BienesRaices.com',
        Text:'Confirma tu Cuenta en BienesRaices.com',
        html : `
            <p>hola  ${nombre} confirma tu cuenta en Bienes Raices.com</p>
            <p> tu cuenta ya esta lista solo debes confirmarla en el siguiente enlace :
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/out/confirmar/${token}">Confirmar cuenta</a>  </p>

            <p> Si tu no creaste esta cuenta puedes ignorar el mensaje  </p>
            `
       })
}

const emailRecuperacion = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
        }
        });

        const {email , nombre , token} = datos
        let Binesracies = "BienesRaices";
    await transport.sendMail({
        from: Binesracies,
        to:  email,
        subject:'Reestablece tu Password en BienesRaices.com',
        Text:   'Reestablece tu Password en BienesRaices.com',
        html : `
            <p>hola  ${nombre} Has Solicitado Reestablecer tus passwoed en  Bienes Raices.com</p>

            <p> Sigue el Siguiente Enlace para Generar tu nuevo Password  :
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/out/recuperacion/${token}">Reestablecer Password</a>  </p>

            <p> Si tu no solicitaste cambiar tu password esta cuenta puedes ignorar el mensaje  </p>
            `
       })
}


export{
    emailRegistro,
    emailRecuperacion

}