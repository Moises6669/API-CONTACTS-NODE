const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage(
        " Name should not be empty, should be more than one and less than 30 character"
      ),

    body("password", "the password is required")
      .isLength({ min: 5 })
      .notEmpty()
      .withMessage("the password must be greater than 5 characters"),

    body("email", "Your email is not valid").notEmpty().isEmail(),
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
