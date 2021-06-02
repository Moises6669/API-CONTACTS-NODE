const Users = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

exports.LoginUserPost = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(404).json({
      ok: false,
      message: "Revise su nombre de usuario y/o contraseña ",
    });
  } else {
    const email = req.body.email;
    const password = req.body.password;

    const user = Users.findOne({ where: { email: email } }).then((dbuser) => {
      if (!dbuser) {
        return res.status(401).json({ 
          ok: false,
          error: "El usuario no existe, puedes crear uno en inicio de sesión" 
        });
      }

      if (!bcrypt.compareSync(password, dbuser.password)) {
        return res.status(401).json({
          ok: false,
          error: "Contraseña incorrecta" 
        });
      }

      const token = jwt.sign({
        id: dbuser.id,
        name: dbuser.name,
        email: dbuser.email
      }, process.env.SECRET)

      return res.status(200).json({
        ok: true,
        user: dbuser,
        token: token
      });
    });
  }
};
