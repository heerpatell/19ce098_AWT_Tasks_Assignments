const express = require("express")
const router= express.Router()
const FacultyDetail = require('../models/facInfo')

//create
router.route('/create').post(async(req,res)=>{
    try{
        const femail = req.body.femail;
        const fname = req.body.fname;
        const fid = req.body.fid;

        const newFaculty =new FacultyDetail({
            femail,
            fname,
            fid
        })
        console.log(newFaculty)

        const fac =await newFaculty.save()
        res.status(201).send({message:"Created succesfully"})

    }catch(e){
        console.log("error",e)
    }
})

//read
router.route("/get").get((req,res)=>{
    FacultyDetail.find().then((data)=>{
        res.json(data)
    })
})

//update
router.route('/update/:id').put(async(req,res)=>{
    const id = req.params.id

    await FacultyDetail.findByIdAndUpdate(id,
        {femail:"pqr@gmail.com",fname:"pqr",fid:"103"}  //edited values
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
    await FacultyDetail.findByIdAndDelete(id).exec()
   .then(()=>{
        res.json({message:"User deleted successfully"})
   })
   .catch((e)=>{
       console.log("error",e)
   })
})

module.exports = router;