const express = require("express")
const router = express.Router()
const {homepage, studentsignup} = require("../Controllers/indexcontroller")

//GET / route
router.get("/", homepage)



//Post route

router.post("/student/signup", studentsignup)




module.exports = router