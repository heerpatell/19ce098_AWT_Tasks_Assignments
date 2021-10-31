const express = require("express")
const router= express.Router()
const StudentDetail = require('../models/studentinfo')

//create
router.route('/create').post(async(req,res)=>{
    try{
        const sem = req.body.sem;
        const sname = req.body.sname;
        const sid = req.body.sid;

        const newStudent =new  StudentDetail({
            sem,
            sname,
            sid
        })
        console.log(newStudent)

        const stu =await newStudent.save()
        res.status(201).send({message:"Created succesfully"})

    }catch(e){
        console.log("error",e)
    }
})

//read
router.route("/get").get((req,res)=>{
    StudentDetail.find().then((data)=>{
        res.json(data)
    })
})

//update
router.route('/update/:id').put(async(req,res)=>{
    const id = req.params.id

    await StudentDetail.findByIdAndUpdate(id,
        {sem:"updated sem",sname:"updated name",sid:"updated id"}  //edited values
        ,{new:true}).exec()
   .then(()=>{
        res.json({message:"User updated successfully"})
   })
   .catch((e)=>{
       console.log("error",e)
   })
})

//delete
router.route('/delete/:id').delete(async(req,res)=>{
    const id = req.params.id
    await StudentDetail.findByIdAndDelete(id).exec()
   .then(()=>{
        res.json({message:"User deleted successfully"})
   })
   .catch((e)=>{
       console.log("error",e)
   })
})

module.exports = router;