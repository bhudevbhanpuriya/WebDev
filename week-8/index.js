const express = require('express')
const jwt = require("jsonwebtoken")
const JWT_SECRET = "strangerthings"
const zod = require("zod")
const mongoose = require("mongoose")


const app = express();
app.use(express.json())

app.post("/signup",async function(req,res){
    
})

app.post("/login",async function(req,res){
    
})

app.post("/purchase",async function(req,res){
    
})

app.get("/courses",async function(req,res){
    
})
