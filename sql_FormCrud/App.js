const express = require("express")
const mysql = require("mysql")
require('dotenv').config()

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/form',(req,res)=>{
    res.sendFile(__dirname+'/form.html')
})

app.listen(process.env.PORT,()=>{
    console.log("server started")
})