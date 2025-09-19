import { Model ,DataTypes } from "sequelize";
import sequelize from "../config/database";

class Postulacion extends Model{
    static associate(models){
        this.belongsTo(models.Aprendiz,{foreignKey: "posAprendizId", as: "aprendiz"})
        this.belongsTo(models.Convocatoria,{foreignKey: "posConvocatoriaId", as: "convocatoria"})
    }
}

Postulacion.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    posFechaHoraPostulacion:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
},{
    sequelize,
    modelName: "Postulacion",
    tableName: "Postulaciones",
    timestamps: true
})

export default Postulacion