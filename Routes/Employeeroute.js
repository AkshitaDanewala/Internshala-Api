const express = require("express")
const router = express.Router()
const {homepage, employeesignup, employeesignin, employeesignout, currentemployee,  studentsendmail, studentforgetlink, studentresetpassword, studentupdate, studentavatar} = require("../Controllers/employeecontroller.js")
const {isAuthenticated} = require("../Middleware/Auth.js")

//GET / route
router.get("/", homepage)

 //POST
router.post("/Currentemployee", isAuthenticated, currentemployee )


 //Post signup route
router.post("/signup", employeesignup)


// //post signin route
router.post("/signin", employeesignin)


// //post signout route
router.get("/signout",  isAuthenticated,  employeesignout)


// //POST send-mail route
// router.post("/student/send-mail",   studentsendmail)


// //GET forget route
// router.get("/student/forget-link/:id",   studentforgetlink)


// // GET reset password route

// router.post("/student/reset-password/:id", isAuthenticated,  studentresetpassword)


// //POST update route

// router.post("/student/update/:id", isAuthenticated,  studentupdate)



// //POST student/avatar/:studentid
// router.post("/student/avatar/:id", isAuthenticated,  studentavatar)



module.exports = router