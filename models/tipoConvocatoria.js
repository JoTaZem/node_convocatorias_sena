import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

class TipoConvocatoria extends Model{
    static associate(models){
        this.hasMany(models.Convocatoria,{foreignKey: "conTipoId", as: "tipo"})
    }
}

TipoConvocatoria.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipNombre:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false        
    }
},{
    sequelize,
    modelName: "TipoConvocatoria",
    tableName: "TiposConvocatorias",
    timestamps: true
})

export default TipoConvocatoria