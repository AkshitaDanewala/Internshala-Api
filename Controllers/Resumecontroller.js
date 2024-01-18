const { CatchAsyncError } = require("../Middleware/CatchAsyncError")
const studentData = require("../Models/StudentModel")
const ErrorHandler = require("../utils/ErrorHandler")
const { v4: uuidv4 } = require('uuid');



exports.resume = CatchAsyncError(async (req, res, next) => {

    const { resume } = await studentData.findById(req.id).exec()

    res.json({ message: " Secure Resume Page!", resume })
})



exports.addeducation = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    student.resume.education.push({ ...req.body, id: uuidv4() })
    await student.save()

    res.json({ message: " Education Added!" })
})



exports.editeducation = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const eduIndex = student.resume.education.findIndex((i) => i.id === req.params.eduid)
    student.resume.education[eduIndex] = { ...student.resume.education[eduIndex], ...req.body }
    await student.save()

    res.json({ message: " Education Updated!" })
})



exports.deleteeducation = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const Filterededucation = student.resume.education.filter((i) => i.id !== req.params.eduid)
    student.resume.education = Filterededucation
    await student.save()

    res.json({ message: " Education Deleted!" })
})


// -------------------job---------------------------------


exports.addjob = CatchAsyncError(async (req,res,next) =>{

    const student = await studentData.findById(req.id).exec()
    student.resume.jobs.push({...req.body, id: uuidv4()})
    await student.save()

    res.json({message: "Job Added"})
})



exports.editjob = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const jobIndex = student.resume.jobs.findIndex((i) => i.id === req.params.jobid)
    student.resume.jobs[jobIndex] = { ...student.resume.jobs[jobIndex], ...req.body }
    await student.save()

    res.json({ message: " Jobs Updated!" })
})


exports.deletejob = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const Filteredjob = student.resume.jobs.filter((i) => i.id !== req.params.jobid)
    student.resume.jobs = Filteredjob
    await student.save()

    res.json({ message: " Jobs Deleted!" })
})



// ------------------------------internship---------------------------


exports.addinternship = CatchAsyncError(async (req,res,next) =>{

    const student = await studentData.findById(req.id).exec()
    student.resume.internships.push({...req.body, id: uuidv4()})
    await student.save()

    res.json({message: "Internships Added"})
})



exports.editinternship = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const internshipIndex = student.resume.internships.findIndex((i) => i.id === req.params.internshipid)
    student.resume.internships[internshipIndex] = { ...student.resume.internships[internshipIndex], ...req.body }
    await student.save()

    res.json({ message: " Internship Updated!" })
})


exports.deleteinternship = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const Filteredinternship = student.resume.internships.filter((i) => i.id !== req.params.internshipid)
    student.resume.internships = Filteredinternship
    await student.save()

    res.json({ message: " Internship Deleted!" })
})



// ------------------------------responsibilities-----------------------


exports.addresponsibilities = CatchAsyncError(async (req,res,next) =>{

    const student = await studentData.findById(req.id).exec()
    student.resume.responsibilities.push({...req.body, id: uuidv4()})
    await student.save()

    res.json({message: "Responsibilities Added"})
})



exports.editresponsibilities = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const responsibilitiesIndex = student.resume.responsibilities.findIndex((i) => i.id === req.params.responsibilitiesid)
    student.resume.responsibilities[responsibilitiesIndex] = { ...student.resume.responsibilities[responsibilitiesIndex], ...req.body }
    await student.save()

    res.json({ message: " Responsibilities Updated!" })
})



exports.deleteresponsibilities = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const Filteredresponsibilities = student.resume.responsibilities.filter((i) => i.id !== req.params.responsibilitiesid)
    student.resume.responsibilities = Filteredresponsibilities
    await student.save()

    res.json({ message: " Responsibilities Deleted!" })
})


// ----------------------------courses--------------------------------



exports.addcourses = CatchAsyncError(async (req,res,next) =>{

    const student = await studentData.findById(req.id).exec()
    student.resume.courses.push({...req.body, id: uuidv4()})
    await student.save()

    res.json({message: "Courses Added"})
})



exports.editcourses = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const coursesIndex = student.resume.courses.findIndex((i) => i.id === req.params.coursesid)
    student.resume.courses[coursesIndex] = { ...student.resume.courses[coursesIndex], ...req.body }
    await student.save()

    res.json({ message: " Courses Updated!" })
})



exports.deletecourses = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const Filteredcourses = student.resume.courses.filter((i) => i.id !== req.params.coursesid)
    student.resume.courses = Filteredcourses
    await student.save()

    res.json({ message: " Courses Deleted!" })
})



// ----------------------------projects--------------------------------


exports.addprojects = CatchAsyncError(async (req,res,next) =>{

    const student = await studentData.findById(req.id).exec()
    student.resume.projects.push({...req.body, id: uuidv4()})
    await student.save()

    res.json({message: "Projects Added"})
})



exports.editprojects = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const projectsIndex = student.resume.projects.findIndex((i) => i.id === req.params.projectsid)
    student.resume.projects[projectsIndex] = { ...student.resume.projects[projectsIndex], ...req.body }
    await student.save()

    res.json({ message: " Projects Updated!" })
})


exports.deleteprojects = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const Filteredprojects = student.resume.projects.filter((i) => i.id !== req.params.projectsid)
    student.resume.projects = Filteredprojects
    await student.save()

    res.json({ message: " Projects Deleted!" })
})


// ----------------------------skills--------------------------------


exports.addskills = CatchAsyncError(async (req,res,next) =>{

    const student = await studentData.findById(req.id).exec()
    student.resume.skills.push({...req.body, id: uuidv4()})
    await student.save()

    res.json({message: "Skills Added"})
})



exports.editskills = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const skillsIndex = student.resume.skills.findIndex((i) => i.id === req.params.skillsid)
    student.resume.skills[skillsIndex] = { ...student.resume.skills[skillsIndex], ...req.body }
    await student.save()

    res.json({ message: " Skills Updated!" })
})



exports.deleteskills = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const Filteredskills = student.resume.skills.filter((i) => i.id !== req.params.skillsid)
    student.resume.skills = Filteredskills
    await student.save()

    res.json({ message: " Skills Deleted!" })
})


// --------------------------addaccomplishments------------------------------



exports.addaccomplishments = CatchAsyncError(async (req,res,next) =>{

    const student = await studentData.findById(req.id).exec()
    student.resume.accomplishments.push({...req.body, id: uuidv4()})
    await student.save()

    res.json({message: "Accomplishments Added"})
})



exports.editaccomplishments = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const accomplishmentsIndex = student.resume.accomplishments.findIndex((i) => i.id === req.params.accomplishmentsid)
    student.resume.accomplishments[accomplishmentsIndex] = { ...student.resume.accomplishments[accomplishmentsIndex], ...req.body }
    await student.save()

    res.json({ message: " Accomplishments Updated!" })
})



exports.deleteaccomplishments = CatchAsyncError(async (req, res, next) => {

    const student = await studentData.findById(req.id).exec()
    const Filteredaccomplishments = student.resume. accomplishments.filter((i) => i.id !== req.params.accomplishmentsid)
    student.resume. accomplishments = Filteredaccomplishments
    await student.save()

    res.json({ message: " Accomplishments Deleted!" })
})