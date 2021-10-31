const fs= require('fs')
const http= require('http')
const url=require('url')

//non blocking way-synchronous
const replaceTemplate = (temp,product) => {
    let output;
    output = temp.replace(/{%PRODUCTNAME%}/g,product.product_name);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%PRODUCTCOST%}/g,product.product_cost);
    output = output.replace(/{%IMAGE%}/g,product.product_image);
    output = output.replace(/{%ID%}/g,product.product_id);
    output = output.replace(/{%PRODUCTTYPE%}/g,product.product_type);
    output = output.replace(/{%PRODUCTQ%}/g,product.product_quantity);
    output = output.replace(/{%SID%}/g,product.product_id+1);
    if (!product.discount) output = output.replace(/{%NODISCOUNT%}/g,'No-discount');
    return output;
   }
   const tempOverview = fs.readFileSync(`${__dirname}/default.html`,'utf-8');
   const tempcards = fs.readFileSync(`${__dirname}/cardinfo.html`,'utf-8');
   const tempproduct = fs.readFileSync(`${__dirname}/productFile/product.html`,'utf-8');
//    const temperror = fs.readFileSync(`${__dirname}/pagenotfound.html`,'utf-8');
   const data=fs.readFileSync(`${__dirname}/data.json`,'utf-8');
   const dataObj = JSON.parse(data);
   

const server = http.createServer((req,res)=>{
   // res.end('server call');
    // const pathname = req.url;

   const { query , pathname}= url.parse(req.url,true);
    
    if(pathname === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        const cardsHtml = dataObj.map(el => replaceTemplate(tempcards,el));
        // console.log(cardsHtml);
        
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        // output = tempOverview.replace('{%PRODUCT_COST%}',cardsHtml.product_cost);
        // output = tempOverview.replace('{%DESCRIPTION%}',cardsHtml.description);
        res.end(output);
    }else if(pathname === '/default'){
        fs.readFile('default.html',function (err, data){
            res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
            res.write(data);
            res.end();
        });
    }else if(pathname === '/product'){
        if(query.id === undefined){
            res.end('This is product page');
            }
            else{
            res.writeHead(200,{'content-type':'text/html'});
            console.log('query.id',query.id);
            const product = dataObj[query.id];
            const output = replaceTemplate(tempproduct,product);
            res.end(output);
            }
    }else if(pathname === '/api'){
        fs.readFile(`${__dirname}/product.json`,'utf-8',(err,data)=>{
            const productData = JSON.parse(data);  
            console.log(productData);    
            // res.writeHead(200,{ 'content-type' :'application/json'})
            // res.end(data)
        })
    }else{
        res.end("page not found")
    }

})
server.listen(3003,()=>{
    console.log("server is listening");
})