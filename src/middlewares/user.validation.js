const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage(
        "Username cannot be empty"
      ),

    body("password", "Password required")
      .isLength({ min: 5 })
      .notEmpty()
      .withMessage("The password must be at least 5 letters long"),

    body("email", "E-mail is required").notEmpty().isEmail(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty())return next();

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
