const {Router} = require("express")
const adminRouter = Router()

const {adminModel} = require("../db")

adminRouter.post("/signup",async function(req,res){

})

adminRouter.post("/signin",async function(req,res){
    
})

adminRouter.post("/",async function(req,res){
    
})


adminRouter.post("/bulk",async function(req,res){
    
})

module.exports = {
    adminRouter : adminRouter
}