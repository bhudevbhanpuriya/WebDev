const express = require('express')
const app = express()

const users = [{
    name : "John",
    kidneys: [{
        healthy : false
    }]
}]

app.use(express.json())


app.get('/',function(req,res){
    const johnkidneys = users[0].kidneys;
    const numberOfKidneys = johnkidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i=0;i<numberOfKidneys;i++){
        if(johnkidneys[i].healthy == true){
            numberOfHealthyKidneys = numberOfHealthyKidneys+1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})



app.post('/',function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    })
    res.json({
        msg : "Accomplish"
    })
})



app.put('/',function(req,res){
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({})
})

function isThereIsAtleastoneUnHealtheKidney(){
    let atleastAnyoneHealtheKidney = false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastAnyoneHealtheKidney = true;
        }
    }
    return atleastAnyoneHealtheKidney
}


app.delete('/',function(req,res){
    if(isThereIsAtleastoneUnHealtheKidney()){
        const newKidneys = [];
        for(let i=0;i<users[0].kidneys.length;i++){
            newKidneys.push({
                healthy:true
            })
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg:"Done"
        })
    }
    else{
        res.status(411).json({
            msg : "No unhealthy kidneys found"
        })
    }
})

app.listen(3000);