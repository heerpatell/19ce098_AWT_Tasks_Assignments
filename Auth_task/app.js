const express = require ('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

//database
var User = require("./model/User")
const app=express()
app.set('port',5000)

// app.use(bodyParser.urlencoded({
//     extended:true
// }))

app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser())

app.use(session({
    key:"user_id",
    secret:"secret messagae",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:600000,
    }
}))

var sessionCheker=(req,res,next)=>{
    if(req.session.user && req.cookies.user_id){
        res.redirect("/dashboard")
    }else{
        next()
    }
}

//routes
app.get('/',sessionCheker,(req,res)=>{
    res.redirect('/login')
})

app.route('/login')
.get(sessionCheker,(req,res)=>{
    res.sendFile(__dirname+"/public/login.html")
})
.post(async(req,res)=>{
    var email = req.body.email,
    password = req.body.password
    try{
        var user=await User.findOne({email:email}).exec();
        if(!user){
            res.redirect("/login")
        }else{
            user.comparePassword(password,(err,match)=>{
                if(!match){
                    res.send("user exists but pswd doesn't matched")
                    res.redirect("/login")
                }
                res.send("Login succesfully")
            })
            req.session.use =user;
            req.redirect("/dashboard")
        }
    }catch(e){
        console.log(e)
    }
})

app.route('/signup')
.get(sessionCheker,(req,res)=>{
    res.sendFile(__dirname+"/public/signup.html")
})
.post((req,res)=>{
    var user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    user.save((err,doc)=>{
        if(err){
            res.redirect("/signup")
        }else{
            req.session.user = doc
            res.redirect("/dashboard")
        }
    })
})

app.get('/dashboard',(req,res)=>{
    if(req.session.user && req.cookies.user_id){
        res.sendFile(__dirname+"/public/dashboard.html")
    }else{
        res.redirect("/login")
    }
})

app.get("/logout",(req,res)=>{
    if(req.session.user && req.cookies.user_id){
        res.clearCookie("user_id");
        res.redirect("/")
    }else{
        res.redirect("/login")
    }
})

app.use(function(req,res,next){
    res.status(404).send("Can't find page")
})

app.listen(app.get('port'),()=>{
    console.log(`server is listening ${app.get('port')}`)
})