import Postulacion from "../models/postulacion";
import Aprendiz from "../models/aprendiz";
import Convocatoria from "../models/convocatoria";
import Usuario from "../models/usuario";
import enviarCorreo from "../utils/mailer";

export const createPostulacion = async (req, res) => {
    const { posConvocatoriaId } = req.body
    const usuarioId = req.user.id

    try {
        const aprendiz = await Aprendiz.findOne({
            where: { aprUsuarioId: usuarioId }
        })

        if (!aprendiz){
            return res.status(404).json({message: "aprendiz no encontrado"})
        }
        
        const posAprendizId = aprendiz.id   

        const existingPostulacion = await Postulacion.findOne({
            where: { posAprendizId, posConvocatoriaId }
        })

        if (existingPostulacion){
            return res.status(409).json({message: "Ya te postulaste a esta convocatoria"})
        }

        const nuevaPostulacion = await Postulacion.create({
            posAprendizId,
            posConvocatoriaId
        })

        const usuario= await Usuario.findByPk(usuarioId)
        const convocatoria = await Convocatoria.findByPk(posConvocatoriaId)
        if (usuario && convocatoria){
            await enviarCorreo(usuario.correo, "confirmacion de postulacion",
            `<p>Nos permitimos confirmar su postulacion a la convocatoria <b> ${convocatoria.conNombre}</b></p>`
            )
        }
        res.status(201).json({
            message: "postulacion creada correctamente",
            postulacion: nuevaPostulacion
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "error al crear la postulacion",error:err.message})
    }
}
export const getAllPostulaciones = async (req, res) => {
    if(req.user.rol !== "Funcionario" && req.user.rol != "Lider"){
        return res.status(403).json({message: "Acceso denegado"})
    }
    try {
        const postulaciones = await Postulacion.findAll({
            include:[
                {model: Aprendiz, as: "aprendiz"},
                {model: Convocatoria, as: "convocatoria"}
            ]
        })
        res.status(200).json(postulaciones)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "error al obtener las postulaciones",error:err.message})        
    }
}