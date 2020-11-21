const {Model,DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../database');

class User extends Model {}

User.init({
    name:{
        type: DataTypes.STRING,
        allowNull:false,     
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:'Users'
})

module.exports = User;