import bcrypt from 'bcrypt'

const usuarios = [ 
    {

        nombre:'Lisandro',
        email:'lisansierra@outlook.com',
        confirmado:1,
        password: bcrypt.hashSync('password',10)
    }
]

export default usuarios;