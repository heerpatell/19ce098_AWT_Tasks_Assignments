const mongoose = require('mongoose')
const Semester = require('./semesterModel')

const subInfoSchema = new mongoose.Schema({
    subId:{
        type:Number,
        required:true
    },
    subCode:{
        type:String,
        required:true
    },
    subName:{
        type:String,
        required:true
    },
    semId:{
        type:Number,
        ref:Semester
    }
})

module.exports = mongoose.model("SubjectInfo",subInfoSchema)