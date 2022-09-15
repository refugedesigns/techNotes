const http = require("http")
const app = require("./app")
const connectDB = require("./utils/db")

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
    try {
        await connectDB(process.env.MONGO_URL)
        console.log("MongoDB Connected!")
        server.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}...`)
        })
    } catch (error) {
        console.error(error)
    }
}

startServer()