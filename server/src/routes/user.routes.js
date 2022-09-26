const { Router } = require("express")
const {
  getAllUsers,
  creatNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers")
const { validateRegister, validateUpdateUser } = require("../utils/validate")

const router = Router()

router
  .route("/")
  .get(getAllUsers)
  .post(validateRegister, creatNewUser)
  .patch(validateUpdateUser, updateUser)
  .delete(deleteUser)

module.exports = router
