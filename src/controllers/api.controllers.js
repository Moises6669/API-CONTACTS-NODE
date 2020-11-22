const bcryp = require('bcrypt');
const User = require('../models/user.model');
const fs = require('fs');
const helper = require('../helper/upload');


exports.GetAllUsers = (req, res) => {
    res.json({
        message: 'Hola mundo'
    })
}


exports.GetOneUsers = (req, res) => {

}


exports.PostCreateUsers = (req, res) => {
    const body = req.body;
    const file = global.appRoot + '/uploads/' + req.file.filename;
    console.log(req.file.originalname);
    fs.rename(req.file.path, file, (err) => {

        User.create({
            name: body.name,
            email: body.email,
            password: bcryp.hashSync(body.password,10),
            img: req.file.filename
        }).then(post => {
            res.json({
                ok: true,
                post
            })
        }) 

    })
}


exports.PutUpdateUsers = (req, res) => {

}


exports.DeleteUsers = (req, res) => {

}