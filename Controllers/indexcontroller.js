
const {CatchAsyncError} = require("../Middleware/CatchAsyncError")

exports.homepage = CatchAsyncError(async (req,res,next)=>{
    res.json({message: "hoepage"})
} ) 