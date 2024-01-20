
const {CatchAsyncError} = require("../Middleware/CatchAsyncError")
const employeeData = require("../Models/EmployeeModel.js")
const internshipData = require("../Models/internshipModel.js")
const JobModelData = require("../Models/jobModel.js")
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


exports.employeesendmail = CatchAsyncError(async (req,res,next)=>{

const employee = await employeeData.findOne({email: req.body.email}).exec()
if(!employee) return next(new ErrorHandler("User not found with this email address", 404));

const url = `${req.protocol}://${req.get("host")}/employee/forget-link/${employee._id}`

sendmail(req,res, next, url)

employee.resetpasswordToken = "1"
 await employee.save()

    res.json({employee, url})

 } ) 


 exports.employeeforgetlink = CatchAsyncError(async (req,res,next)=>{

    const employee = await employeeData.findById(req.params.id).exec()

    if(!employee) 
    return next(new ErrorHandler("User not found with this email address", 404));
    

    if(employee.resetpasswordToken == "1"){
        employee.resetpasswordToken = "0"
        employee.password = req.body.password
        await employee.save()
    } else{
    return next(new ErrorHandler("Invalid Reset Password Link Please try Again", 500));

    }

    res.status(200).json({message: "Password has been successfully Changed"})
 }) 





 exports.employeeresetpassword = CatchAsyncError(async (req,res,next)=>{

    const employee = await employeeData.findById(req.id).exec()
    employee.password = req.body.password
    await employee.save()

SendToken(employee, 201, res)
    

 }) 


 exports.employeeupdate = CatchAsyncError(async (req,res,next)=>{

      const employee = await employeeData.findByIdAndUpdate(req.params.id, req.body).exec()
    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        employee
    })
} ) 



exports.employeeavatar = CatchAsyncError(async (req,res,next)=>{
    const employee = await employeeData.findById(req.params.id).exec()
const file = req.files.organizationlogo
const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`

if(employee.organizationlogo.fileId !== ""){
    await imagekit.deleteFile(employee.organizationlogo.fileId)
}


const {fileId, url} = await imagekit.upload({file: file.data, fileName: modifiedFileName })
employee.organizationlogo = {fileId, url}
await employee.save()
res.status(200).json({
    success: true,
    message: "Profile updated"
})
// res.json({ image })


} ) 


// ----------------------internship-----------------------------------------



exports.internshipcreate = CatchAsyncError(async (req,res,next)=>{
    const employee = await employeeData.findById(req.id).exec()
    const internship = await new internshipData(req.body)
    internship.employee = employee._id
    employee.internships.push(internship._id)
    await internship.save()
     await employee.save()
    res.status(201).json({success: true, internship})
} ) 



exports.internshipread = CatchAsyncError(async (req,res,next)=>{
    const {internship} = await employeeData.findById(req.id).populate("internships").exec()
    res.status(200).json({success: true, internship})
} ) 


exports.internshipsingleread = CatchAsyncError(async (req,res,next)=>{

    const internship = await internshipData.findById(req.params.id).exec()
    res.status(200).json({success: true, internship})
} ) 






// ----------------------jobs-----------------------------------------


exports.jobscreate = CatchAsyncError(async (req,res,next)=>{
    const employee = await employeeData.findById(req.id).exec()
    const job = await new JobModelData(req.body)
    job.employee = employee._id
    employee.jobs.push(job._id)
    await job.save()
     await employee.save()
    res.status(201).json({success: true, job})
} ) 



exports.jobsread = CatchAsyncError(async (req,res,next)=>{
    const { job } = await employeeData.findById(req.id).populate("jobs").exec()
    res.status(200).json({success: true, job})
} ) 


exports.jobssingleread = CatchAsyncError(async (req,res,next)=>{

    const job = await JobModelData.findById(req.params.id).exec()
    res.status(200).json({success: true, job})
} ) 