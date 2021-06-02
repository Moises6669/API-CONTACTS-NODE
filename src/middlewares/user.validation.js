const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage(
        "El nombre de usuario no puede estar vacio"
      ),

    body("password", "Se require la contraseña")
      .isLength({ min: 5 })
      .notEmpty()
      .withMessage("La contraseña debe de tener como minimo 5 letras"),

    body("email", "El correo electronico es requerido").notEmpty().isEmail(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
