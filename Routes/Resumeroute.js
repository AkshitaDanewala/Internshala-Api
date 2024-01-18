const express = require("express")
const router = express.Router()
const {resume, addeducation, editeducation, deleteeducation, addjob, editjob, deletejob, addinternship, editinternship, deleteinternship, addresponsibilities, editresponsibilities, deleteresponsibilities, addcourses, editcourses, deletecourses, addprojects, editprojects, deleteprojects, addskills, editskills, deleteskills, addaccomplishments, editaccomplishments, deleteaccomplishments} = require("../Controllers/Resumecontroller")
const {isAuthenticated} = require("../Middleware/Auth.js")

//GET / route
router.get("/", isAuthenticated, resume)

//POST route
router.post("/add-edu", isAuthenticated, addeducation)


//POST route
router.post("/edit-edu/:eduid", isAuthenticated, editeducation)


//POST route
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)



// -------------------------job-------------------------------


//POST route
router.post("/add-job", isAuthenticated, addjob)


//POST route
router.post("/edit-job/:jobid", isAuthenticated, editjob)


//POST route
router.post("/delete-job/:jobid", isAuthenticated, deletejob)


// ------------------------internship------------------------------------


//POST route
router.post("/add-internship", isAuthenticated, addinternship)



//POST route
router.post("/edit-internship/:internshipid", isAuthenticated, editinternship)


//POST route
router.post("/delete-internship/:internshipid", isAuthenticated, deleteinternship)



// ----------------------------responsibilities--------------------------------


//POST route
router.post("/add-responsibilities", isAuthenticated, addresponsibilities)



//POST route
router.post("/edit-responsibilities/:responsibilitiesid", isAuthenticated, editresponsibilities)


//POST route
router.post("/delete-responsibilities/:responsibilitiesid", isAuthenticated, deleteresponsibilities)


// ----------------------------courses--------------------------------


//POST route
router.post("/add-courses", isAuthenticated, addcourses)



//POST route
router.post("/edit-courses/:coursesid", isAuthenticated, editcourses)



//POST route
router.post("/delete-courses/:coursesid", isAuthenticated, deletecourses)



// ----------------------------projects--------------------------------


//POST route
router.post("/add-projects", isAuthenticated, addprojects)



//POST route
router.post("/edit-projects/:projectsid", isAuthenticated, editprojects)



//POST route
router.post("/delete-projects/:projectsid", isAuthenticated, deleteprojects)



// ----------------------------skills--------------------------------


//POST route
router.post("/add-skills", isAuthenticated, addskills)



//POST route
router.post("/edit-skills/:skillsid", isAuthenticated, editskills)



//POST route
router.post("/delete-skills/:skillsid", isAuthenticated, deleteskills)



// ------------------------accomplishments---------------------------------


//POST route
router.post("/add-accomplishments", isAuthenticated, addaccomplishments)



//POST route
router.post("/edit-accomplishments/:accomplishmentsid", isAuthenticated, editaccomplishments)



//POST route
router.post("/delete-accomplishments/:accomplishmentsid", isAuthenticated, deleteaccomplishments)




module.exports = router



