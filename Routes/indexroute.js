const express = require("express")
const router = express.Router()
const {homepage, studentsignup, studentsignin, studentsignout, currentUser,  studentsendmail, studentforgetlink, studentresetpassword, studentupdate, studentavatar} = require("../Controllers/indexcontroller")
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



module.exports = router