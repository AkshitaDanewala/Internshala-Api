const express = require("express")
const router = express.Router()
const {homepage, studentsignup, studentsignin, studentsignout, currentUser,  studentsendmail, studentforgetlink, studentresetpassword, studentupdate, studentdelete, studentavatar, applyinternship, applyjob} = require("../Controllers/indexcontroller")
const {isAuthenticated} = require("../Middleware/Auth.js")

//GET / route
router.get("/", homepage)

//POST
router.post("/student", isAuthenticated, currentUser )

//Post signup route

router.post("/student/signup", studentsignup)


//post signin route
router.post("/student/signin", studentsignin)


//post signout route
router.get("/student/signout",  isAuthenticated,  studentsignout)


//POST send-mail route
router.post("/student/send-mail",   studentsendmail)


//GET forget route
router.get("/student/forget-link/:id",   studentforgetlink)


// GET reset password route

router.post("/student/reset-password/:id", isAuthenticated,  studentresetpassword)


//POST update route

router.post("/student/update/:id", isAuthenticated,  studentupdate)



//POST student/avatar/:studentid
router.post("/student/avatar/:id", isAuthenticated,  studentavatar)


//POST update route

router.post("/student/delete/:id", isAuthenticated,  studentdelete)
 


// ------------------- apply internship---------------------------------

//POST student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated,  applyinternship)



// ------------------- apply job---------------------------------

// //POST student/apply/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated,  applyjob)



module.exports = router