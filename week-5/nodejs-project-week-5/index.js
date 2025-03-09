const express = require("express")

const app = express()

let requestCnt = 0;


//reqIncreaser is a kind of a middle-ware
function reqIncreaser(req,res,next){
    requestCnt++;
    console.log(`number of requestCnt ${requestCnt} `);
    next();
}

app.get('/sum',reqIncreaser,function(req,res){
    const a =parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        answer:a+b
    })
})

// app.get('/subtract',reqIncreaser,function(req,res){
//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);
//     res.json({
//         answer :a-b
//     })
// })

// app.get('/multiply',function(req,res){
//     const a =parseInt(req.query.a);
//     const b = parseInt(req.query.b);
//     res.json({
//         answer: a*b
//     })
// })

// app.get('/divide',function(req,res){
//     const a =parseInt(req.query.a);
//     const b = parseInt(req.query.b);
//     res.json({
//         answer:a/b
//     })
// })

app.listen(3000)