const { check, validationResult } = require("express-validator")

const validateRegister = [
  check("username", "Username is required").not().isEmpty().isAlpha(),
  check("password", "Password is required.").isLength({ min: 6 }),
  check("roles.*", "You must provide roles for user.")
    .isAlpha()
    .isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    next()
  },
]

validateUpdateUser = [
    check("id", "User must have an id field.").not().isEmpty().isString(),
    check("username", "Please provide a username field.").not().isEmpty().isAlpha(),
    check("roles.*", "Roles field must be provided.").isAlpha().isLength({ min: 5 }),
    check("active", "Active field must a boolean.").isBoolean(), 
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }

        next()
    }
]

module.exports = {
    validateRegister
}