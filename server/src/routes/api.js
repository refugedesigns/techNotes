const { Router } = require("express");
const userRoutes = require("./user.routes.js")


const api = Router();

api.use("/users", userRoutes)


module.exports = api