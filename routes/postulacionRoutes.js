import { Router } from "express";
import * as postulacion from "../controllers/postulacionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router()

router.post("/",authMiddleware,postulacion.createPostulacion)
router.get("/",authMiddleware,postulacion.getAllPostulaciones)

export default router