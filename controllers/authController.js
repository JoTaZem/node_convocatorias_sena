import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js"
import Aprendiz from "../models/aprendiz.js"
import Funcionario from "../models/funcionario.js"
import enviarCorreo from "../utils/mailer.js"
import passwordGenerado from "../utils/generarPassword.js"

export const Register = async (req,res)=> {
    const {username, password, correo, identificacion, 
        nombre, apellido, rol, aprFicha, aprPrograma, funCargo}=req.body
    try{
        const existingUser = await Usuario.findOne({where : {username}})
        if(existingUser){
            return res.status(409).json({message: "el nombre de usuario ya existe..."})
        }

        const salt = await bcrypt.genSalt(10)
        const password = passwordGenerado
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const newUser = await Usuario.create({
            username, password: hashedPassword,
            identificacion, nombre, apellido,
            correo, rol
        })

        if (rol=== "Aprendiz"){
            await Aprendiz.create({
                aprUsuarioId: newUser.id,
                aprFicha, aprPrograma
            })
        }if(rol==="Funcionario" || rol==="Lider"){
            await Funcionario.create({
                funUsuarioId: newUser.id,
                funCargo
            })
        }else{
            return res.status(400).json({message: "Rol de usuario no valido"})
        }
        let asunto = "registro en el sistema"
        let mensaje = `<p>informamos que ha sido registrado, enviamos credenciales de ingreso. 
        <br> <b>Username:</b>${username}</br><b>password:</b>${password} </p>`
        await enviarCorreo(correo,asunto,mensaje)

        res.status(201).json({message: "usuario registrado correctamente"})
    }catch(err){
        console.error(err)
        res.status(500).json({message: "error al registrar el usuario",error:err.message})
    }
}

export const login= async (req,res) => {
    const {username, password} = req.body
    try {
        const user = await Usuario.findOne({where: {username}})
        if(!user){
            return res.status(400).json({message: "usuario o contraseña incorrectos"})
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({message: "username o contraseña incorrecta"})
        }

        const token = jwj.sign({id:user.id, rol:user.rol},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )
        res.status(200).json({
            message: "inicio de sesion exitoso",
            token,
            user:{
                id:user.id,
                username: user.username,
                rol:user.rol
            }
        })
    }catch(err){
        console.error(err)
        res.status(500).json({message: "error al iniciar sesion",error:err.message})
    }
}
