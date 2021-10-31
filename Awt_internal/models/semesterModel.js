const mongoose = require('mongoose')

const semesterSchema = new mongoose.Schema({
    semId:{
        type:Number,
        required:true
    },
    sem:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Semester",semesterSchema)