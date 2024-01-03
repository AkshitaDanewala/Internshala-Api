const express = require("express")
const router = express.Router()
const {homepage} = require("../Controllers/indexcontroller")

//GET / route
router.get("/", homepage)




module.exports = router