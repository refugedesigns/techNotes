const createError = require("http-errors")
const { CustomAPIError } = require("../utils/custom-error")
const {logEvents } = require("./logger")

const errorHandler = (error, req, res, next) => {
    logEvents(`${error.name}: ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(error.stack)
    if (error instanceof CustomAPIError) {
        return res.status(error.statusCode).json({msg: error.message})
    }
    return res.status(500).json({msg: "Server error, please try again."})
}

const notFound = (req, res, next) => {
    next(createError(404))
}

module.exports = {
    errorHandler,
    notFound
}