const express = require("express")
const router = express.Router()
const {resume, addeducation, editeducation, deleteeducation} = require("../Controllers/Resumecontroller")
const {isAuthenticated} = require("../Middleware/Auth.js")

//GET / route
router.get("/", isAuthenticated, resume)

//POST route
router.post("/add-edu", isAuthenticated, addeducation)


//POST route
router.post("/edit-edu/:eduid", isAuthenticated, editeducation)


//POST route
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)



module.exports = router