import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Students = db.define('students',{
    rollno:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    institute:{
        type: DataTypes.STRING
    },
    course:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

export default Students;