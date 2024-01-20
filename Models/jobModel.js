const mongoose = require("mongoose")

const JobModel = new mongoose.Schema({

    students: [{type: mongoose.Schema.Types.ObjectId, ref: "student",}],
 employee: {type: mongoose.Schema.Types.ObjectId, ref: "employee",},
   

Jobtitle: String,
JobType: {
    type: String,
    enum: ["In office", "Remote"]
},
openings: Number,
skills: String, 
description: String,
preferences: String,
salary: Number,
responsibility: String,
perks: String,
assesments: String,

},
{timestamps: true}

)




const JobModelData = mongoose.model("JobModelData",  JobModel )
module.exports = JobModelData