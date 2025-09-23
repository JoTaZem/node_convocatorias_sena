import { DataTypes,Model } from "sequelize";
import sequelize from "../config/database.js";

class Convocatoria extends Model{
    static associate(models){
        this.belongsTo(models.TipoConvocatoria,{foreignKey: "conTipoId", as: "tipo"})
        this.hasMany(models.Postulacion, {foreignKey:'posConvocatoriaId',as:'postulaciones'})
    }
}

Convocatoria.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    conNombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    conCantidadBeneficiarios:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conFechaInicio:{
        type: DataTypes.DATE,
        allowNull: false
    },
    conFechaFinal:{
        type: DataTypes.DATE,
        allowNull: false
    },
    conFechaCreacion:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    conDocumento:{
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    sequelize,
    modelName: "Convocatoria",
    tableName: "Convocatorias",
    timestamps: true

})

export default Convocatoria