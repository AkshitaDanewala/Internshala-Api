
const {CatchAsyncError} = require("../Middleware/CatchAsyncError")
const employeeData = require("../Models/EmployeeModel.js")
const ErrorHandler = require("../utils/ErrorHandler")
const {SendToken} = require("../utils/SendToken")
const {sendmail} = require("../utils/Nodemailer.js")
const path = require("path")
const { userInfo } = require("os")
const imagekit = require("../utils/imagekit.js").initImagekit()


exports.homepage = CatchAsyncError(async (req,res,next)=>{
    res.json({message: " Secure Employee Homepage!"})
} ) 


exports.currentemployee = CatchAsyncError(async (req,res,next)=>{
    const employee = await employeeData.findById(req.id).exec()
    res.json({ employee })
})


exports.employeesignup= CatchAsyncError(async (req,res,next)=>{

    const employee = await new employeeData(req.body).save()
    SendToken(employee, 201, res)
} ) 


exports.employeesignin = CatchAsyncError(async (req,res,next)=>{

    const employee = await employeeData.findOne({email: req.body.email})
    .select("+password")
    .exec()

if(!employee) return next(new ErrorHandler("User not found with this email address", 404))

const isMatch = employee.comparepassword(req.body.password)
if(!isMatch) return next( new ErrorHandler("Wrong Credentials", 500))

SendToken(employee, 200, res)


} ) 


exports.employeesignout = CatchAsyncError(async (req,res,next)=>{

   res.clearCookie("token")
   res.json({message: "Successfully signout"})
} ) 


// exports.studentsendmail = CatchAsyncError(async (req,res,next)=>{

// const student = await studentData.findOne({email: req.body.email}).exec()
// if(!student) return next(new ErrorHandler("User not found with this email address", 404));

// const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`

// sendmail(req,res, next, url)

// student.resetpasswordToken = "1"
//  await student.save()

//     res.json({student, url})

//  } ) 


//  exports.studentforgetlink = CatchAsyncError(async (req,res,next)=>{

//     const student = await studentData.findById(req.params.id).exec()

//     if(!student) 
//     return next(new ErrorHandler("User not found with this email address", 404));
    

//     if(student.resetpasswordToken == "1"){
//         student.resetpasswordToken = "0"
//         student.password = req.body.password
//         await student.save()
//     } else{
//     return next(new ErrorHandler("Invalid Reset Password Link Please try Again", 500));

//     }

//     res.status(200).json({message: "Password has been successfully Changed"})
//  }) 





//  exports. studentresetpassword = CatchAsyncError(async (req,res,next)=>{

//     const student = await studentData.findById(req.id).exec()
//     student.password = req.body.password
//     await student.save()

// SendToken(student, 201, res)
    

//  }) 


//  exports.studentupdate = CatchAsyncError(async (req,res,next)=>{

//       const student = await studentData.findByIdAndUpdate(req.params.id, req.body).exec()
//     res.status(200).json({
//         success: true,
//         message: "Student updated successfully",
// student
//     })
// } ) 



// exports. studentavatar = CatchAsyncError(async (req,res,next)=>{
//     const student = await studentData.findById(req.params.id).exec()
// const file = req.files.avatar
// const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`

// if(student.avatar.fileId !== ""){
//     await imagekit.deleteFile(student.avatar.fileId)
// }


// const {fileId, url} = await imagekit.upload({file: file.data, fileName: modifiedFileName })
// student.avatar = {fileId, url}
// await student.save()
// res.status(200).json({
//     success: true,
//     message: "Profile updated"
// })
// // res.json({ image })


// } ) 