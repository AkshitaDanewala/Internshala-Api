const express = require("express")
const router = express.Router()
const {homepage, employeesignup, employeesignin, employeesignout, currentemployee,employeesendmail, employeeforgetlink, employeeresetpassword, employeeupdate, employeeavatar, internshipcreate, internshipread, internshipsingleread} = require("../Controllers/employeecontroller.js")
const {isAuthenticated} = require("../Middleware/Auth.js")

//GET / route
router.get("/", homepage)

 //POST
router.post("/Currentemployee", isAuthenticated, currentemployee )


 //Post signup route
router.post("/signup", employeesignup)


 //post signin route
router.post("/signin", employeesignin)


//post signout route
router.get("/signout",  isAuthenticated,  employeesignout)


 //POST send-mail route
router.post("/send-mail",   employeesendmail)


 //GET forget route
router.get("/forget-link/:id",   employeeforgetlink)


 // GET reset password route

router.post("/reset-password/:id", isAuthenticated,  employeeresetpassword)


//POST update route

router.post("/update/:id", isAuthenticated,  employeeupdate)



//POST student/avatar/:studentid
router.post("/avatar/:id", isAuthenticated,  employeeavatar)




// ----------------------internship-----------------------------------------


 //POST/employee/internship/create
router.post("/internship/create", isAuthenticated,  internshipcreate)


//POST/employee/internship/read
router.post("/internship/read", isAuthenticated,  internshipread)

//POST/employee/internship/read/:id
router.post("/internship/read/:id", isAuthenticated,  internshipsingleread)



module.exports = router