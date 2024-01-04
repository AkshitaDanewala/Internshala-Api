
const {CatchAsyncError} = require("../Middleware/CatchAsyncError")

const studentData = require("../Models/StudentModel")

exports.homepage = CatchAsyncError(async (req,res,next)=>{
    res.json({message: "hoepage"})
} ) 


exports.studentsignup = CatchAsyncError(async (req,res,next)=>{

    const student = await new studentData(req.body).save()
    res.status(201).json(student)
} ) 