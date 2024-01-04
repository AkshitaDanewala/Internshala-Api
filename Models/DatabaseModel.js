const mongoose = require("mongoose")

exports.connectDatabase = async ()=>{
    try{
            await mongoose.connect(process.env.MONGODB_URL)
            console.log("Databse connected")
    }catch(err){
        console.log(err.message)
    }
}