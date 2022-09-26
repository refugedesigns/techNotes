const User = require("../models/user.model")
const Notes = require("../models/note.model")

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean()

  if (!users?.length) {
    return res.status(400).json({ msg: "No users found" })
  }

  res.status(200).json({ users })
}

// @desc Create new user
// @route POST /users
// @access Private
const creatNewUser = async (req, res) => {
  const { username, password, roles } = req.body

  const duplicate = await User.find({ username }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ msg: "User already exist!" })
  }

  const userObject = {
    username,
    password,
    roles,
  }

  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({ msg: `New user ${username} created` })
  } else {
    res.status(400).json({ msg: "Invalid user data received!" })
  }
}

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  const { id, username, password, active, roles } = req.body

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(404).json({ msg: "User not found!" })
  }

  const duplicate = await User.findOne({ username }).lean().exec()

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ msg: "Duplicate username" })
  }

  user.username = username
  user.active = active
  user.roles = roles

  if (password) {
    user.password = password
  }

  const updatedUser = await user.save()

  res.status(200).json({ msg: `${updateUser.username} updated!` })
}

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(409).json({ msg: "ID field is required." })
  }

  const notes = await Notes.findOne({ user: id })

  if (!notes) {
    return res.status(400).json({ msg: "User has assigned notes" })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return user.status(400).json({ msg: "User not found." })
  }

  const result = await user.deleteOne()

  res
    .status(200)
    .json({ msg: `Username ${result.username} with ID ${result._id}` })
}

module.exports = {
  getAllUsers,
  creatNewUser,
  updateUser,
  deleteUser,
}
