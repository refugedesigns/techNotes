require("dotenv").config()
require("express-async-handler")
const path = require("path")
const express = require("express")
const cors = require("cors")

const { errorHandler, notFound } = require("./middlewares/errors")

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

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



app.use(notFound)
app.use(errorHandler)

module.exports = app