import Convocatoria from "../models/convocatoria";
import TipoConvocatoria from "../models/tipoConvocatoria";

export const createConvocatoria = async(req,res)=>{
    try {
        const {conNombre, conCantidadBeneficiarios, conFechaInicio, conFechaFinal,conTipoId } = req.body
        const conDocumento=req.file? req.file.path : null

        const nuevaConvocatoria = await Convocatoria.create({
            conNombre,
            conCantidadBeneficiarios,
            conFechaInicio,
            conFechaFinal,
            conDocumento,
            conTipoId
        }) 
        res.status(201).json(nuevaConvocatoria)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "error al crear la convocatoria",error:err.message})
    }
}

export const getAllConvocatorias = async(req,res)=>{
    try {
        const convocatorias = await Convocatoria.findAll({
        include: [{model: TipoConvocatoria, as: "tipo"}]
    })
    res.status(200).json(convocatorias)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "error al obtener las convocatorias",error:err.message})
    }
}

export const getConvocatoriaById = async(req,res)=>{
    try {
        const { id } = req.params
        const convocatoria = await Convocatoria.findByPk(id,{
            include:[{model: TipoConvocatoria,as: "tipo"}]
        })
        if(!convocatoria){
            return res.status(404).json({message: "convocatoria no encontrada"})
        }
        res.status(200).json(convocatoria)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "error al obtener la convocatoria",error:err.message})
    }
}

export const updateConvocatoria = async(req,res)=>{
    try {
        const {id} = req.params
        const {conNombre, conCantidadBeneficiarios,conFechaInicio,conFechaFinal,conTipoId}=req.body
        const convocatoria = await Convocatoria.findByPk(id)
        if(!convocatoria){
            return res.status(404).json({message: "convocatoria no encontrada"})
        }

        await convocatoria.update({
            conNombre,
            conCantidadBeneficiarios,
            conFechaInicio,
            conFechaFinal,
            conTipoId
        })
        res.status(200).json({message: "convocatoria actualizada correctamente",convocatoria})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "error al actualizar la convocatoria",error:err.message})
    }
}

export const deleteConvocatoria = async(req,res)=>{
    try {
        const {id} = req.params
        const convocatoria = await Convocatoria.findByPk(id)

        if(!convocatoria){
            return res.status(404).json({message: "convocatoria no encontrada"})
        }
        await convocatoria.destroy()
        res.status(200).json({message: "convocatoria eliminada correctamente"})
    } catch (error) {
        console.error(err)
        res.status(500).json({message: "error al eliminar la convocatoria",error:err.message})
    }
}