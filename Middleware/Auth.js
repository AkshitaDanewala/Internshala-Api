const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/ErrorHandler")
const { CatchAsyncError} = require("./CatchAsyncError")




exports.isAuthenticated = CatchAsyncError(async (req,res, next)=>{

    const {token} = req.cookies

if(!token) {
return next(new ErrorHandler("Please login in to access the resource", 401))
}

const { id } = jwt.verify(token, process.env.JWT_SECRET)
req.id = id
next()
  // res.json({id, token})
} )