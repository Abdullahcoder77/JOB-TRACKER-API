const mongoose = require("mongoose");
 
const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
   status: { 
    type: String, 
    enum: ["Applied", "Interview", "Rejected", "Offered"],
    default: "Applied"
},
company: {
    type:String,
    required: [true, "Company name is required"]

},

position: {
    type:String,
    required: [true, "Position is required"]
},

salary: {
    type:Number,
    
},
notes: {
    type:String,

},
appliedDate: {
    type:Date,
    default: Date.now },
    link: {
        type: String,
        
    }

},  {
    timestamps: true
});
   jobSchema.index({ userId: 1 });
const Job = mongoose.model("Job", jobSchema);
module.exports = Job;