import "dotenv/config"
import express from "express"
import cors from "cors"
import sequelize from "./config/database.js"
//rutas
import authRoutes from "./routes/authRoutes.js"
import convocatoriaRoutes from "./routes/convocatoriaRoutes.js"
import postulacionRoutes from "./routes/poatulacionRoutes.js"
//import resultadoPostulacionRoutes from "./routes/resultadoPostulacionRoutes.js"
import aprendizRoutes from "./routes/aprendizRoutes.js"
import funcionarioRoutes from "./routes/funcionarioRoutes.js"
//models
import Usuario from "./models/usuario.js"
import TipoConvocatoria from "./models/tipoConvocatoria.js"
import Convocatoria from "./models/convocatoria.js"
import Funcionario from "./models/funcionario.js"
import Aprendiz from "./models/aprendiz.js"
import Postulacion from "./models/postulacion.js"
//import ResultadoPostulacion from "./models/resultadoPostulacion.js"

const models = {
    Usuario,TipoConvocatoria,Convocatoria,Funcionario,
    Aprendiz,Postulacion,ResultadoPostulacion
}

Object.keys(models).forEach(modelName =>{
    if(models[modelName].associate){
        models[modelName].associate(models)
    }
})

const app = express()
app.use(express.json())
app.use(cors())


sequelize.sync({alter:true}).then(() => {
    console.log("Conexion a la base de datos establecida y modelos sincronizados.")
}).catch(err =>{
    console.error("Error al conectar a la base de datos:", err)  
})

app.use("/uploads",express.static("uploads"))

app.use("/api/auth",authRoutes)
app.use("/api/convocatorias",convocatoriaRoutes)
app.use("/api/postulaciones",postulacionRoutes)
app.use("/api/resultados",resultadoPostulacionRoutes)
app.use("/api/aprendices",aprendizRoutes)
app.use("/api/funcionarios",funcionarioRoutes)

const PORT =  process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto  ${PORT}`)
})

