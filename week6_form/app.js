const express= require('express')
var bodyparser = require('body-parser')
const { check, validationResult } = require('express-validator');

const app=express()
app.set('view engine', 'pug')

const port=7000
app.use(express.urlencoded({
    extended:true
}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/form.html")
})

//get
app.get('/data',(req,res)=>{
    // var fname = req.query.fname;
    // console.log(fname)
    var value = JSON.parse(JSON.stringify(req.query))
       res.render("data.pug",{
        "data" : value 
        })
})

//post
app.post('/xyz',
    check('mail','Email is not valid').isEmail().normalizeEmail(),
    check('ins',"this must be selected").exists(),
    check('sem',"this must be selected").exists(), 
    check('no',"must be 10 digits").isLength({min:10}),
    check('gender',"this must be selected").exists()
,(req,res)=>{
        
        var errors = validationResult(req);
        const alert = errors.array()
        if (!errors.isEmpty()) {
            // alert
            console.log(errors.mapped())
            // return res.status(422).jsonp(errors.array)
            res.send(errors)
        }
        else {
            var value = JSON.parse(JSON.stringify(req.body))
            
            res.render("data.pug",{
                "data" : value 
            })
        }
})

app.listen(port,()=>{
    console.log("server is listening")
})