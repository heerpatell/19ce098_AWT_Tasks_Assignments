const express = require("express")
const router= express.Router()
const Semester = require('../models/semesterModel')
const SubjectInfo = require('../models/subjectInfoModel')
const Syllabus = require('../models/syllabusModel')

router.route('/semester/:sem').get(async(req,res)=>{

    const info={
        semesterId:"",
        subjectId:"",
        subjectCode:"",
        subjectName:"",
        topicId:"",
        topicName:""
    } 

    const sem = req.params.sem

    const semData = await Semester.find({sem}).exec()   //sem:sem
    info.semesterId=semData[0].semId

    const subjData = await SubjectInfo.find({sem}).exec()
    info.subjectId = subjData[0].subId
    info.subjectCode = subjData[0].subCode
    info.subjectName = subjData[0].subName

    const syallabusData = await Syllabus.find({sem}).exec()
    info.topicId = syallabusData[0].topicId
    info.topicName = syallabusData[0].topicName

    console.log(syallabusData[0])
    console.log(info)

})

router.route('/subjectid/:subid').get(async(req,res)=>{
    const info={
        semesterId:"",
        subjectId:"",
        subjectCode:"",
        subjectName:"",
        topicId:"",
        topicName:""
    } 

    const subid = req.params.subid

    const subData = await SubjectInfo.find({subId:subid}).exec()
    info.subjectCode = subData[0].subCode
    info.subjectName = subData[0].subName
    info.subjectId = subData[0].subId
    info.semesterId =subData[0].semId

    const syllabusData = await Syllabus.find({subId:subid}).exec()
    info.topicId = syllabusData[0].topicId
    info.topicName = syllabusData[0].topicName

    console.log(info)
})

module.exports = router;