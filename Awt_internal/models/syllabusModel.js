const mongoose = require('mongoose')
const Semester = require('./semesterModel')
const SubjectInfo = require('./subjectInfoModel')

const syllabusSchema = new mongoose.Schema({
    topicId:{
        type:Number,
        required:true
    },
    topicName:{
        type:String,
        required:true
    },
    subId:{
        type:Number,
        ref:SubjectInfo
    },
    semId:{
        type:Number,
        ref:Semester
    }
})

module.exports = mongoose.model("Syllabus",syllabusSchema)