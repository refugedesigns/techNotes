require("dotenv").config()
require("express-async-handler")
const path = require("path")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const { errorHandler, notFound } = require("./middlewares/errors")
const api = require("./routes/api")
const { logger } = require('./middlewares/logger')
const corsOptions = require("./config/corsOptions")

const app = express()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "public")))

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__direname, "..", "public", "index.html"))
    })
} else {
    app.get("/*", (_, res) => {
        res.send("API is running")
    })
}

app.use("/api/v1", api)

app.use(notFound)
app.use(errorHandler)

module.exports = app