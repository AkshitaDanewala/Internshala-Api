const express = require("express")
const router = express.Router()
const {homepage, studentsignup, studentsignin, studentsignout} = require("../Controllers/indexcontroller")
const {isAuthenticated} = require("../Middleware/Auth.js")

//GET / route
router.get("/", isAuthenticated, homepage)


//Post signup route

router.post("/student/signup", studentsignup)


//post signin route
router.post("/student/signin", studentsignin)


//post signout route
router.get("/student/signout", studentsignout)






module.exports = router