const {Model,DataTypes} = require('sequelize');
const sequelize = require('../database');
 

class User extends Model {}

User.init({
    name:{
        type: DataTypes.STRING,
        allowNull:[false,'es nesesario un name'],     
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    img:{
        type: DataTypes.STRING,
        allowNull:true
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
    }
    
},{
    sequelize,
    modelName:'Users',
    timestamps: true
})

//method to not return the password
User.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
     delete values.password;
     return values;
}


module.exports = User;