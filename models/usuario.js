import { Model, DataTypes, ENUM } from "sequelize"
import sequelize from "../config/database"

class Usuario extends Model { 
    static associate(models){
        this.hasOne(models.Funcionario,{foreignKey: "funUsuarioId", as: "funcionario"})
        this.hasOne(models.Aprendiz ,{foreignKey: "aprUsuarioId", as: "aprendiz"})
    
    }
}

Usuario.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    identificacion:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull: false
    },
    correo:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    rol:{
        type:ENUM("Lider","Funcionario","Aprendiz"),
        allowNull: false
    }
},{
    sequelize,
    modelName: "Usuario",
    tableName: "Usuarios",
    timestamps: true,
})

export default Usuario