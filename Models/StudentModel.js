const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const StudentModel = new mongoose.Schema({

    username: String,

    email:{
        type:String,
        unique: true,
        reuired: [true, "Email is Required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    }, 

    password: {
       type: String,
       select: false,
       maxlength: [15, "Password should not be exceed more than 15 characters"],
       minlength: [5, "Password should not be less than 5 characters"]
    //    match"[]
},
},
{timestamps: true}

)


StudentModel.pre("save", function(){

if(!this.isModified("password")){
    return
}

    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})


StudentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password)
}
const studentData = mongoose.model("StudentData",  StudentModel )
module.exports = studentData