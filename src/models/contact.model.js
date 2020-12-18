const {Model,DataTypes} = require('sequelize');
const sequelize = require('../database');
const User = require('./user.model');


class Contact extends Model{}


Contact.init({
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'A contact name is required'
            }
        }
    },
    number:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'the contact requires a number'
            }
        }
    }
}, {
    sequelize,
    modelName: "Contacts",
    timestamps: true
});
module.exports = Contact;