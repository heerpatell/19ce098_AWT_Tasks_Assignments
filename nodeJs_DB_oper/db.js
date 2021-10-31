const router = require('express')
const mysql = require('mysql')

const getConn = () =>{
    mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"awt"
    })
}

router.post('/studentdetail',(req,res)=>{

    const scode = req.body.scode;
    const sname = req.body.sname;
    const iname = req.body.iname;
    const dname = req.body.dname;
    const sem = req.body.sem;

    const sql = "INSERT INTO studentdetail VALUES ?";
    const values = [[scode,sname,iname,dname,sem]];
    getConn().query(sql,[values],(err,res,fields)=>{
        if(err){
            console.log("failed to reg student ",err)
            res.sendStatus(500)
            return;
        }
        console.log("Inserted new student :",res.scode)
        res.end()
    })

    res.end()
    console.log("clicked");
})

