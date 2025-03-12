const zod = require("zod")
const mongoose = require("mongoose")

const schema  = mongoose.schema
const ObjectId = mongoose.ObjectId

const Users = new schema({
    email : {type :String , unique : true},
    password : zod.string.min(3).max(12)
})

const Admin = new schema({
    adminEmail : zod.string.min(3).max(20),
    password : zod.string.min(3).max(12)
})

const Course = new schema({
    description : zod.string,
    price : zod.price,
    courseId : ObjectId
})

const Purchase = new schema({
    courseName : zod.string,
    noOfPurchases : zod.number,
    userId : ObjectId
})