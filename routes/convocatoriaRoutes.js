import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
import * as convocatoria from "../controllers/convocatoriaController.js";

const router = Router()

router.post("/",authMiddleware,upload.single("conDocumento"), convocatoria.createConvocatoria)
router.get("/",authMiddleware,convocatoria.getAllConvocatorias)
router.get("/:id",authMiddleware,convocatoria.getConvocatoriaById)
router.put("/:id",authMiddleware,convocatoria.updateConvocatoria)
router.delete("/:id",authMiddleware,convocatoria.deleteConvocatoria)

export default router