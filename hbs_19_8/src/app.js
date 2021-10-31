const express = require("express")
const app= express()
const path = require('path')
const port=5000

const staticPath = path.join(__dirname,"./views")
app.set("views",staticPath)
app.set("view engine","hbs")

app.get('',(req,res)=>{
    res.render("index")
})
app.get('/signin',(req,res)=>{
    res.render("signin")
})
app.get('/signup',(req,res)=>{
    res.render("signup")
})

app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})