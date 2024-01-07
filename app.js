require("dotenv").config({path: "./.env"})
const express = require("express")
const app = express()


//Database connection
require("./Models/DatabaseModel.js").connectDatabase()

const logger = require("morgan")
app.use(logger("tiny"))


//body parser

app.use(express.json())
app.use(express.urlencoded({extended: false}))




// Get Route
app.use("/", require("./Routes/indexroute.js"))


//Errors handler code

const ErrorHandler =  require("./utils/ErrorHandler.js")
const {GeneratedErrors} = require("./Middleware/Errors.js")
 
app.all("*", (req,res,next)=>{
    next(new ErrorHandler("Requested URL Not Found", 404))
})


app.use(GeneratedErrors)

app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`))

module.exports = app