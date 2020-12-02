const Contact = require('../models/contact.model');
const User = require('../models/user.model')
const { json } = require('body-parser');



exports.getAllContacts = (req, res) => {
    Contact.findAll({
        include: {
            model: User,
            as: 'autorUser',
        }
    }).then(post => {
        res.status(200).json({
            ok: true,
            message: 'successful',
            post
        })
    })
}


exports.getOneContacts = (req, res) => {
    let id = req.params.id;

    Contact.findOne({
        include: {
            model: User,
            as: 'autorUser',
        },
        where: {
            id: id
        }
    }).then(contact => {
        if (contact != null) {
            res.status(200).json({
                ok: true,
                result: contact
            });
        } else {
            res.status(404).json({
                ok: false,
                message: 'Error 404 the data does not exist',
            });
        }
    }).catch(err => {
        res.status(500).json({
            ok: false,
            message: 'Internal Error Server',
            err
        });
    });
}



exports.PostNewContact = (req, res) => {
    let body = req.body;

    Contact.create({
        name: body.name,
        number: body.number
    }).then(result => {
        res.status(201).json({
            ok: true,
            message: 'successful',
            result
        });
    }).catch(err => {
        res.status(500).json({
            ok: false,
            message: err
        });
    });
}

exports.PostContactId = (req, res) => {
    let body = req.body;
    let id = req.params.id;

    try {
        User.findOne({
            where: {
                id: id
            }
        }).then(user => {

            Contact.create({
                name: body.name,
                number: body.number,
                userId: id
            }).then(result => {
                res.status(201).json({
                    ok: true,
                    message: 'successful',
                    result
                });
            }).catch(err => {
                res.status(404).json({
                    ok: false,
                    message: err
                });
            });
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            err
        })
    }
}

exports.PutContact = (req, res) => {
    let body = req.body;
    let id = req.params.id;

    try {
        Contact.findOne({ where: { id: id } })
            .then(contact => {
                if (contact != null) {
                    Contact.update({
                        name: body.name,
                        number: body.number,
                    }, {
                        where: {
                            id: id
                        }
                    }).then(result => {
                        res.status(204).json({
                            ok: true,
                            message: 'success update',
                            result
                        })
                    }).catch(err => {
                        res.status(400).json({
                            ok: false,
                            message: err
                        })
                    })
                } else {
                    res.status(404).json({
                        ok: false,
                        message: '404: No such data found'
                    })
                }
            })
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving data"
        });
    }
}


exports.DeleteContact = (req, res) => {
    let id = req.params.id;

    Contact.findOne({ where: { id: id } })
        .then(contact => {
            if (contact != null) {
                Contact.destroy({ where: { id: id } })
                    .then(result => {
                        res.status(204).json({
                            ok: true,
                            message: 'success update',
                            result
                        })
                    }).catch(err => {
                        res.status(400).json({
                            ok: false,
                            message: err
                        })
                    })
            } else {
                res.status(404).json({
                    ok: false,
                    message: '404: No such data found'
                })
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error retrieving data",
                err
            });
        })

}