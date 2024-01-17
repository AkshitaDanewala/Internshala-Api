const {CatchAsyncError} = require("../Middleware/CatchAsyncError")
const studentData = require("../Models/StudentModel")
const ErrorHandler = require("../utils/ErrorHandler")
const { v4: uuidv4 } = require('uuid');



exports.resume = CatchAsyncError(async (req,res,next)=>{

const {resume} = await studentData.findById(req.id).exec()

 res.json({message: " Secure Resume Page!", resume})
} ) 



exports.addeducation = CatchAsyncError(async (req,res,next)=>{

    const student = await studentData.findById(req.id).exec()
    student.resume.education.push({...req.body, id: uuidv4() })
     await student.save()
    
     res.json({message: " Education Added!"})
    } ) 



    exports.editeducation = CatchAsyncError(async (req,res,next)=>{

        const student = await studentData.findById(req.id).exec()
         const eduIndex = student.resume.education.findIndex((i) => i.id === req.params.eduid)
         student.resume.education[eduIndex] = {...student.resume.education[eduIndex], ...req.body}
         await student.save()
        
         res.json({message: " Education Updated!"})
        } ) 



        exports.deleteeducation = CatchAsyncError(async (req,res,next)=>{

            const student = await studentData.findById(req.id).exec()
             const Filterededucation = student.resume.education.filter((i) => i.id !== req.params.eduid)
              student.resume.education =  Filterededucation
             await student.save()
            
             res.json({message: " Education Deleted!"})
            }) 

