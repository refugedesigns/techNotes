const { Router } = require("express");
const userRoutes = require("./user.routes.js")
const notesRoutes = require("./notes.routes")

const api = Router();

api.use("/users", userRoutes)
api.use("/notes", notesRoutes)

module.exports = api