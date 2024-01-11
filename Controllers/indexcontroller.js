
const {CatchAsyncError} = require("../Middleware/CatchAsyncError")
const studentData = require("../Models/StudentModel")
const ErrorHandler = require("../utils/ErrorHandler")
const {SendToken} = require("../utils/SendToken")
const {sendmail} = require("../utils/Nodemailer.js")

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


exports.studentsendmail = CatchAsyncError(async (req,res,next)=>{

const student = await studentData.findOne({email: req.body.email}).exec()
if(!student) return next(new ErrorHandler("User not found with this email address", 404));

const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`

sendmail(req,res, next, url)

student.resetpasswordToken = "1"
 await student.save()

    res.json({student, url})

 } ) 


 exports.studentforgetlink = CatchAsyncError(async (req,res,next)=>{

    const student = await studentData.findById(req.params.id).exec()

    if(!student) 
    return next(new ErrorHandler("User not found with this email address", 404));
    

    if(student.resetpasswordToken == "1"){
        student.resetpasswordToken = "0"
        student.password = req.body.password
        await student.save()
    } else{
    return next(new ErrorHandler("Invalid Reset Password Link Please try Again", 500));

    }

    res.status(200).json({message: "Password has been successfully Changed"})
 }) 





 exports. studentresetpassword = CatchAsyncError(async (req,res,next)=>{

    const student = await studentData.findById(req.id).exec()
    student.password = req.body.password
    await student.save()

SendToken(student, 201, res)
    

 }) 


 exports.studentupdate = CatchAsyncError(async (req,res,next)=>{

      const student = await studentData.findByIdAndUpdate(req.params.id, req.body).exec()
    res.status(200).json({
        success: true,
        message: "Student updated successfully",
student
    })
} ) 