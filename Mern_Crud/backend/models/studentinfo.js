const mongoose = require("mongoose")

const stuSchema =new  mongoose.Schema({
    sem:{
        type:String,
        required:true
    },
    sname:{
        type:String,
        required:true
    },
    sid:{
        type:String,
        required:true
    }
})

const student = mongoose.model("StudentDetail",stuSchema)
module.exports = student