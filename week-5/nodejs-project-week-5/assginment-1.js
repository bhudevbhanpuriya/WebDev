const express = require("express")

const app = express()

function logger(res,req,next){
    console.log("Method name :"+ req.method);
    console.log("Host name :"+ req.hostname);
    console.log("Url:"+ req.url);
    console.log(new Date());
    
}

app.use(logger)

app.get('/sum',function(req,res){
    const a =parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        answer:a+b
    })
})

app.listen(3000)