require("dotenv").config({path: "./.env"})
const express = require("express")
const app = express()

const logger = require("morgan")
app.use(logger("tiny"))

// Get Route
app.use("/", require("./Routes/indexroute.js"))


//Errors handler code

const ErrorHandler =  require("./utils/ErrorHandler.js")
const {GeneratedErrors} = require("./Middleware/Errors.js")
 
app.all("*", (req,res,next)=>{
    next(new ErrorHandler("Requested URL Not Found", 404))
})


app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`))

app.use(GeneratedErrors)

module.exports = app