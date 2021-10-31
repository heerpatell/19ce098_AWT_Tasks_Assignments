const express = require("express")
const router= express.Router()
const Semester = require('../models/semesterModel')
const SubjectInfo = require('../models/subjectInfoModel')
const Syllabus = require('../models/syllabusModel')

router.route('/semester').post(async(req,res)=>{
    try{
        const semId = req.body.semId;
        const sem = req.body.sem; 

        const semesterData = new Semester({
            semId,sem
        })
        console.log(semesterData)
        const semesterDetail = await semesterData.save()
        .then(()=>{
            res.send("Saved successfully")
        })
    }catch(e){
        console.log("error ",e)
    }
})

router.route('/subject/:id').post(async(req,res)=>{
    try{
        const subId = req.body.subId;
        const subCode = req.body.subCode; 
        const subName = req.body.subName;
        const id = req.params.id;

        var semId;
        const sId = await Semester.find({semId:id})
        .exec()
        .then(async(res)=>{
            semId = res[0].semId

            const subjectData = new SubjectInfo({
                subId,subCode,subName,
                semId
            })
            // console.log(subjectData)
    
            const subjectDetail = await subjectData.save()
            .then(()=>{
                console.log("Saved successfully")
            })

        })

    
    }catch(e){
        console.log("error ",e)
    }
})

router.route('/syllabus/:semid/:subid').post(async(req,res)=>{
    try{
        const topicId = req.body.topicId;
        const topicName = req.body.topicName;
        const semesterId = req.params.semid;  
        const subjectId = req.params.subid;

        var semId;
        var subId;

        const sId = await SubjectInfo.find({semId:semesterId})
        .exec()
        .then(async(res)=>{
            semId = res[0].semId
            
            const subjId = await SubjectInfo.find({subId:subjectId})
            .exec()
            .then(async(res)=>{
                subId = res[0].subId
                
                console.log("sid" , subId ,"semid" ,semId)

                const syllabusData = new Syllabus({
                    topicId,topicName,subId,semId
                })
        
                console.log(syllabusData)
                const syllabusDetail = await syllabusData.save()
                .then(()=>{
                    console.log("Saved successfully")
                })

            })
        
        })

    }catch(e){
        console.log("error ",e)
    }
})

module.exports = router;