const express = require("express")
const router = express.Router()
const {homepage, studentsignup, studentsignin, studentsignout, currentUser} = require("../Controllers/indexcontroller")
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






module.exports = router