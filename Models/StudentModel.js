const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const StudentModel = new mongoose.Schema({

firstname: {
    type:String,
    required: [true, "Firstname is Required"],
    minlength: [3, "FirstName should be 3 characters long"],

}, 
lastname: {
    type:String,
    required: [true, "LastName is Required"],
    minlength: [3, "LastName should be 3 characters long"],

}, 
avatar: {
    type: Object,
    default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1635530027421-b793c5c8d045?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
} ,
contact: {
    type:String,
    required: [true, "Contact is Required"],
    maxlength: [10, "Contact should not be  exceed 10 characters long"],
    minlength: [10, "contact should 10 characters long"]


}, 
city:  {
    type:String,
    required: [true, "LastName is Required"],

}, 
gender: {type: String, enum: ["Male", "Female", "Other"]},

    email:{
        type:String,
        unique: true,
        required: [true, "City is Required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    }, 

    password: {
       type: String,
       select: false,
       maxlength: [15, "Password should not be exceed more than 15 characters"],
       minlength: [5, "Password should not be less than 5 characters"]
    //    match"[]
},
resetpasswordToken: {
    type: String,
    default: "0"
},


resume: {
    education: [],
    jobs: [],
    internships: [],
    responsibilities: [],
    courses: [],
    projects: [],
    skills: [],
    accomplishments: [],

},


internships: [
    {
           type: mongoose.Schema.Types.ObjectId, ref: "internship",
   
       }
   ],
   jobs: [{
       type: mongoose.Schema.Types.ObjectId, ref: "job",
   
   }],



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


StudentModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}


const studentData = mongoose.model("StudentData",  StudentModel )
module.exports = studentData