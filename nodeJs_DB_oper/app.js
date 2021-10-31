const express = require("express")
const app= express()
const path = require('path')
const port=5000

const staticPath = path.join(__dirname,"/views")
app.set("views",staticPath)
app.set("view engine","hbs")

app.get('/',(req,res)=>{
    res.render("form")
})

app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})