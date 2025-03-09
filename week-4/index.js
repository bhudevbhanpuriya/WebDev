const express = require('express')
const app = express()

const users = [{
    name : "John",
    kidneys: [{
        healthy : false
    }]
}]

app.get('/',function(res,req){
    const johnkidneys = users[0].kidneys;
    console.log(johnkidneys);
})

app.listen(3000)