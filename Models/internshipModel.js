const mongoose = require("mongoose")

const InternshipModel = new mongoose.Schema({

    employee: {type: mongoose.Schema.Types.ObjectId, ref: "employee",},

profile: String,
internshipType: {
    type: String,
    enum: ["In office", "Remote"]
},
openings: Number,
skills: String, 
from: String,
to: String,
dutation: String,
responsibility: String,
stipend: {
   status: {
    type: String,
    enum: ["Fixed", "Negotiable", "Performane  based", "Unpaid" ]
   },
   amount: Number,
},
perks: String,
assesments: String,

},
{timestamps: true}

)




const internshipData = mongoose.model("internshipData",  InternshipModel )
module.exports = internshipData