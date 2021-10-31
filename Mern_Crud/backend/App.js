require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const studentroute = require("./routes/studentRoute")
const facultyroute = require("./routes/facultyRoute")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PSWD}@cluster0.njtdf.mongodb.net/Prac8_crudMern`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("suucessfully connected to database")
}).catch((e)=>{
    console.log("error",e)
})

app.use("/studnet",studentroute)
app.use("/faculty",facultyroute)

app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`)
})