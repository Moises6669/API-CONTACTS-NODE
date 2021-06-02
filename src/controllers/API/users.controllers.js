const bcryp = require("bcrypt");
const User = require("../../models/user.model");
const fs = require("fs");
const Contact = require("../../models/contact.model");
const jwt = require("jsonwebtoken");

exports.GetAllUsers = (req, res) => {
  User.findAll({
    include: [
      {
        model: Contact,
        as: "contactos",
        attributes: ["name", "number"],
      },
    ],
  }).then((post) => {
    res.json(post);
  });
};

exports.GetOneUsers = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      post
        ? res.json({
            ok: true,
            user: post,
          })
        : res.json({
            ok: false,
            message: "Usuario no encontrado",
          });
    })
    .catch((e) =>
      res.json({
        ok: false,
        message: "Usuario no encontrado",
      })
    );
};

exports.PostCreateUsers = (req, res) => {
  const body = req.body;
  const file = global.appRoot + "/uploads/" + req.file.filename;

  User.findOne({ where: { email: body.email } })
    .then((resp) => {
      if (resp) {
        return res.json({
          ok: false,
          message: "Ya existe una cuenta con este correo electronico",
        });
      } else {
        try {
          fs.rename(req.file.path, file, () => {
            User.create({
              name: body.name,
              email: body.email,
              password: bcryp.hashSync(body.password, 10),
              img: req.file.filename,
            }).then((post) => {
              const token = jwt.sign(
                {
                  id: post.id,
                  name: post.name,
                  email: post.email,
                },
                process.env.SECRET
              );

              res.json({
                ok: true,
                user: post,
                token: token,
              });
            });
          });
        } catch (error) {
          res.json({
            ok: false,
            message: error,
          });
        }
      }
    })
    .catch((err) =>
      res.json({
        error: err,
      })
    );
};

exports.PutUpdateUsers = (req, res) => {
  const body = req.body;
  const file = global.appRoot + "/uploads/" + req.file.filename;

  fs.rename(req.file.path, file, () => {
    User.update(
      {
        name: body.name,
        email: body.email,
        password: bcryp.hashSync(body.password, 10),
        img: req.file.filename,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((data) => {
        data == 1
          ? res.json({
              ok: true,
              message: "El usuario se ha actualizado correctamente",
            })
          : res.json({
              ok: false,
              message: "El usuario no existe",
            });
      })
      .catch((e) =>
        res.json({
          ok: false,
          error: e,
        })
      );
  });
};

exports.DeleteUsers = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      data
        ? res.json({
            ok: true,
            message: "Usuario eliminado correctamente",
          })
        : res.json({
            ok: false,
            message: "No se encontro el usuario",
          });
    })
    .catch((e) =>
      res.json({
        ok: false,
        message: e,
      })
    );
};

exports.DeleteImgUser = (req, res) => {
  let id = req.params.id;

  try {
    User.update({ img: null }, { where: { id: id } })
      .then((user) => {
        res.json({
          ok: true,
          message: "Image Delete",
        });
      })
      .catch((err) => {
        res.status(500).json({
          ok: false,
          message: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: err,
    });
  }
};

exports.UpdateImgUser = (req, res) => {
  const file = global.appRoot + "/uploads/" + req.file.filename;

  fs.rename(req.file.path, file, (_) => {
    User.update(
      {
        img: req.file.filename,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((post) => {
      res.json({
        ok: true,
        message: "Imagen añadida exitosamente",
        post,
      });
    });
  });
};
