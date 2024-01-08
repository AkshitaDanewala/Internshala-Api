
const {CatchAsyncError} = require("../Middleware/CatchAsyncError")
const studentData = require("../Models/StudentModel")
const ErrorHandler = require("../utils/ErrorHandler")
const {SendToken} = require("../utils/SendToken")

exports.homepage = CatchAsyncError(async (req,res,next)=>{
    res.json({message: " Secure Homepage!"})
} ) 


exports.studentsignup = CatchAsyncError(async (req,res,next)=>{

    const student = await new studentData(req.body).save()
    SendToken(student, 201, res)
} ) 


exports.studentsignin = CatchAsyncError(async (req,res,next)=>{

    const User = await studentData.findOne({email: req.body.email})
    .select("+password")
    .exec()

if(!User) return next(new ErrorHandler("User not found with this email address", 404))

const isMatch = User.comparepassword(req.body.password)
if(!isMatch) return next( new ErrorHandler("Wrong Credentials", 500))

SendToken(User, 200, res)


} ) 


exports.studentsignout = CatchAsyncError(async (req,res,next)=>{

   res.clearCookie("token")
   res.json({message: "Successfully signout"})
} ) 