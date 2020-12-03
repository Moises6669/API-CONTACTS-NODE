const bcryp = require('bcrypt');
const User = require('../models/user.model');
const { json } = require('body-parser');
const helper = require('../helper/upload');
const fs = require('fs');
const Contact = require('../models/contact.model');
exports.GetAllUsers = (req, res) => {
    User.findAll({
        include: [{
            model: Contact,
            as: 'contactos',
            attributes: ['name', 'number']
        }]
    }).then(post => {
        res.json(post);
    })
}


exports.GetOneUsers = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
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
                res.status(201).json({
                    ok: true,
                    post
                });
            })


        });
    } catch (err) {
        res.status(500), json({
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
        }, {
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.status(204).json({ 'data': data.dataValues })
        })
    });

}


exports.DeleteUsers = (req, res) => {

    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.status(204).json({ 'status': 'success', 'data': data.dataValues })
    })
}

exports.DeleteImgUser = (req, res) => {

    let id = req.params.id;

    try {

        User.update({ img: null }, { where: { id: id } })
            .then(user => {
                res.json({
                    ok: true,
                    message: 'Image Delete',
                    user
                });
            })
            .catch(err => {
                res.status(500).json({
                    ok: false,
                    message: err
                });
            })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: err
        })
    }
}

exports.UpdateImgUser = (req, res) => {
    const file = global.appRoot + '/images/' + req.file.filename;

    fs.rename(req.file.path, file, _ => {
        User.update({
            img: req.file.filename
        }, {
            where: {
                id: req.params.id
            }
        }).then(post => {
            res.status(204).json({
                ok: true,
                message: 'successful update user image',
                post
            });
        });
    });
}