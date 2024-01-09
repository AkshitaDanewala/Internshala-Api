
const {CatchAsyncError} = require("../Middleware/CatchAsyncError")
const studentData = require("../Models/StudentModel")
const ErrorHandler = require("../utils/ErrorHandler")
const {SendToken} = require("../utils/SendToken")

exports.homepage = CatchAsyncError(async (req,res,next)=>{
    res.json({message: " Secure Homepage!"})
} ) 

exports.currentUser = CatchAsyncError(async (req,res,next)=>{
    const student = await studentData.findById(req.id).exec()
    res.json({ student })
})


exports.studentsignup = CatchAsyncError(async (req,res,next)=>{

    const student = await new studentData(req.body).save()
    SendToken(student, 201, res)
} ) 


exports.studentsignin = CatchAsyncError(async (req,res,next)=>{

    const student = await studentData.findOne({email: req.body.email})
    .select("+password")
    .exec()

if(!student) return next(new ErrorHandler("User not found with this email address", 404))

const isMatch = student.comparepassword(req.body.password)
if(!isMatch) return next( new ErrorHandler("Wrong Credentials", 500))

SendToken(student, 200, res)


} ) 


exports.studentsignout = CatchAsyncError(async (req,res,next)=>{

   res.clearCookie("token")
   res.json({message: "Successfully signout"})
} ) 