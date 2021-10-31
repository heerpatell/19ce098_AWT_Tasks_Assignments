const express = require('express');
const helmet=require('helmet');
const app = express();
app.use(helmet());

const https= require('https');
const path= require('path');
const fs= require('fs');

//routes
app.get('/',(req,res)=>{
    //database,security,validation
    res.send("<h1>hello from express server</h1>");
});

// const sslserevr = https.createServer({
//     key : fs.readFileSync(path.join(__dirname,'Certi','key.pem')),
//     cert : fs.readFileSync(path.join(__dirname,'Certi','cert.pem')),
// },app);

app.listen(3443,()=> console.log('Server listening on port 3443'));
