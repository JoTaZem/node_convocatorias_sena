import { Router } from "express";
import * as postulacion from "../controllers/postulacionController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router()

router.post("/",authMiddleware,postulacion.createPostulacion)
router.get("/",authMiddleware,postulacion.getAllPostulaciones)

export default router