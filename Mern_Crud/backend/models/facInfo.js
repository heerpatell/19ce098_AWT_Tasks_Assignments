const mongoose = require("mongoose")

const facSchema =new  mongoose.Schema({
    femail:{
        type:String,
        required:true
    },
    fname:{
        type:String,
        required:true
    },
    fid:{
        type:String,
        required:true
    }
})

const faculty = mongoose.model("FacultyDetail",facSchema)
module.exports = faculty