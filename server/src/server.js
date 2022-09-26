const http = require("http")
const mongoose = require("mongoose")
const app = require("./app")
const connectDB = require("./utils/db")
const { logEvents } = require("./middlewares/logger")

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URL)

    mongoose.connection.once("open", () => {
      console.log("MongoDB Connected!")
      server.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}...`)
      })
    })
  } catch (error) {
    console.error(error)
  }
}

mongoose.connection.on("error", err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log")
})

startServer()
