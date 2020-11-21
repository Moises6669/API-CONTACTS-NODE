const bcryp = require('bcrypt');
const User = require('../models/user.model');

exports.GetAllUsers = (req,res) =>{
    res.json({
        message:'Hola mundo'
    })
}


exports.GetOneUsers = (req,res) =>{
    
}


exports.PostCreateUsers = (req,res) =>{
    const body = req.body;

    User.create({
        
    })
}


exports.PutUpdateUsers = (req,res) =>{
    
}


exports.DeleteUsers = (req,res) =>{
    
}