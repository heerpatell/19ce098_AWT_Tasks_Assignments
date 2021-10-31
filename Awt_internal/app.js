require("dotenv").config()
const express= require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const insertRoute = require('./routes/insertData')
const displayRoute = require('./routes/displayData')

app.use("/insert",insertRoute)
app.use("/display",displayRoute)

// app.get('/',(req,res)=>{
//     res.send("hi")
// })

//connecting with mongodb
mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PSWD}@cluster0.njtdf.mongodb.net/${process.env.DB}`,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(()=>{
    console.log("connected with mongodb")
}).catch((e)=>{
    console.log("Error in coonecting with mongodb ",e)
})

//server listening
app.listen(5001,()=>{
    console.log("listenig on port")
})