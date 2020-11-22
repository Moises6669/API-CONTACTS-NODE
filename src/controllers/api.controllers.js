const bcryp = require('bcrypt');
const User = require('../models/user.model');
const fs = require('fs');
const helper = require('../helper/upload');
const { json } = require('body-parser');
 


exports.GetAllUsers = (req, res) => {
    User.findAll().then(post => {
        res.json(post);
    })
}


exports.GetOneUsers = (req, res) => {
    User.findOne({
        where:{
            id:req.params.id
        }
    }).then(post => {
        res.json(post);
    })
}


exports.PostCreateUsers = (req, res) => {

    const body = req.body;
    const file = global.appRoot + '/uploads/' + req.file.filename;

    try {
        fs.rename(req.file.path, file, (err) => {
            User.create({
                name: body.name,
                email: body.email,
                password: bcryp.hashSync(body.password, 10),
                img: req.file.filename
            }).then(post => {
                res.json({
                    ok: true,
                    post
                });
            })

        });
    } catch (err) {
        res.status(400), json({
            ok: false,
            message: err
        });
    }
}


exports.PutUpdateUsers = (req, res) => {
    const body = req.body;
    const file = global.appRoot + '/uploads/' + req.file.filename;

    fs.rename(req.file.path, file, _ => {
        User.update({
            name: body.name,
            email: body.email,
            password: bcryp.hashSync(body.password, 10),
            img: req.file.filename
        },{
            where:{
                id:req.params.id
            }
        }).then(data => {
            res.json({'data': data.dataValues})
          })
    });

}


exports.DeleteUsers = (req, res) => {

    User.destroy({
        where:{
            id: req.params.id
        }
    }).then(data => {
        res.json({'status': 'success', 'data': data.dataValues})
      })
}