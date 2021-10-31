const express = require("express")
const mysql = require("mysql")
require('dotenv').config()

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
});

con.connect(function(err) {
    if(err){console.log(err)}
    console.log("Connected!");
});

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//databse creation
app.get('/dbcreate',(req,res)=>{
    try{
        const dbquery = "CREATE DATABASE IF NOT EXISTS studentDetails"

        con.query(dbquery,(e,r)=>{
            if(e) {console.log("error is: ",e)};
            console.log("studentDetails database is created",r)
        })
    }catch(e){
        console.log(e)
    }
})

//Table creation
app.get('/tablecreate',(req,res)=>{
    
    try{     
        const dbq = "USE studentDetails"
        con.query(dbq,(e,r)=>{

            const dbquery1 = `CREATE TABLE studentInfo(
                name varchar(200),
                email varchar(200),
                sem varchar(200)
            )`
            const dbquery2 = `CREATE TABLE facultyInfo(
                fname varchar(200),
                femail varchar(200)
            )`

            con.query(dbquery1,(e,r)=>{
                if(e) {console.log("error is: ",e)};
                console.log("StudentInfo database is created",r)
            })

            con.query(dbquery2,(e,r)=>{
                if(e) {console.log("error is: ",e)};
                console.log("facultyInfo database is created",r)
            })

            if(e) {console.log("error is: ",e)};
            console.log("studentDetails database is created",r)
        })

    }catch(e){
        console.log(e)
    }
    
})

//inserting data ito facultyInfo table
app.post('/insertfaculty',(req,res)=>{
    try{
        con.query('INSERT INTO facultyInfo (fname,femail) values (?,?)',[req.body.fname,req.body.femail],(e,resp)=>{
            if(!e){
                res.send("record has been inserted succesfully")
                console.log("Data inserted suucessfully")
            }else{
                throw e;
            }
        })
    }catch(e){
        console.log(e)
    }
})

//inserting data ito studentInfo table
app.post('/insertstudent',(req,res)=>{
    try{
        con.query('INSERT INTO studentInfo (name,email,sem) values (?,?,?)',[req.body.name,req.body.email,req.body.sem],(e,resp)=>{
            if(!e){
                res.send("record has been inserted succesfully")
                console.log("Data inserted suucessfully")
            }else{
                throw e;
            }
        })
    }catch(e){
        console.log(e)
    }
})

//reading studentInfo(printing table data)
app.get('/showdatastudent',(req,res)=>{
    try{
        const dbq = "USE studentDetails"
        con.query(dbq,(e,r)=>{
            con.query('SELECT * FROM studentInfo',(e,rows,field)=>{
                if(!e){
                    res.send(rows)
                }else{
                    throw e;
                }
            })
        })
    }catch(e){
        console.log(e)
    }
})


//reading facultyInfo(printing table data)
app.get('/showdatafaculty',(req,res)=>{
    try{
        const dbq = "USE studentDetails"
        con.query(dbq,(e,r)=>{
            con.query('SELECT * FROM facultyInfo',(e,rows,field)=>{
                if(!e){
                    res.send(rows)
                }else{
                    throw e;
                }
            })
        })
    }catch(e){
        console.log(e)
    }
})

//update student table
app.get('/updatestudent',(req,res)=>{
    try{
        con.query('UPDATE studentInfo SET email=? WHERE name=?',[req.body.email,req.body.name],(e,rows,field)=>{
            if(!e){
                console.log("Record has been updated from studentTable")
                res.send("Record has been updated")
            }else{
                throw e;
            }
        })
    }catch(e){
        console.log(e)
    }
})

//update faculty table
app.get('/updatefaculty',(req,res)=>{
    try{
        con.query('UPDATE facultyInfo SET femail=? WHERE fname=?',[req.body.femail,req.body.fname],(e,rows,field)=>{
            if(!e){
                console.log("Record has been updated from facultyTable")
                res.send("Record has been updated")
            }else{
                throw e;
            }
        })
    }catch(e){
        console.log(e)
    }
})

//delete from studentInfo
app.get('/deletestudnet',(req,res)=>{
    try{
        con.query('DELETE from studentInfo WHERE name=?',[req.body.name],(e,rows,field)=>{
            if(!e){
                console.log("Record has been deleted from studentInfo table")
                res.send("Record has been deleted")
            }else{
                throw e;
            }
        })
    }catch(e){
        console.log(e)
    }
})

//delete from facultyInfo
app.get('/deletefaculty',(req,res)=>{
    try{
        con.query('DELETE from facultyInfo WHERE fname=?',[req.body.fname],(e,rows,field)=>{
            if(!e){
                console.log("Record has been deleted from facultyInfo table")
                res.send("Record has been deleted")
            }else{
                throw e;
            }
        })
    }catch(e){
        console.log(e)
    }
})

app.use(express.urlencoded({extended:true}))
app.listen(process.env.PORT,()=>{
    console.log("server started")
})