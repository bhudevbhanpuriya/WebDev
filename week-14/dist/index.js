"use strict";
// step :1
// npx tsc -b
// step :2
//node index.js  
// its js not ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userProfileSchema = zod_1.default.object({
    name: zod_1.default.string().min(1),
    email: zod_1.default.string().email(),
    age: zod_1.default.number().min(18).optional(),
});
app.put("/user", (req, res) => {
    const { success } = userProfileSchema.safeParse(req.body);
    //   const updateBody: FinalUserSchema = req.body;
    if (!success) {
        res.status(411).json({});
        return;
    }
    res.json({
        message: "User updated"
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// -----------------------------------------------------------------------------------
/*

let x: number =  1;

console.log(x);

-----------------function in ts

function greet(s:string) : string {
    let ans = " hello from " + s
    return ans;
}

console.log(greet("remiss"))


------------------arrow function in ts

const greet = (s:string) :string => {
   let ans = " hello from " + s
    return ans;
}


console.log(greet("remiss"))

-------------------practicing some functions

function sum(a:number,b:number) : number {
    return a+b;
}

const summ = (a:number,b:number) : number => {
    return a+b;
}

console.log(sum(3,4));


const isLegal = (age:number) : boolean => {
    return age<=18;
}

console.log(isLegal(12));


---------------------- using setTimout


function calling(fn: () => void){
    setTimeout(fn, 5000)
}

function greet(){
    console.log("hello world");
}

------------------------------------using Interface

interface Users {myname:string , age:number, email:string}

function isLegal(user : Users) : boolean {
    return user.age <= 18;
}

const obj : Users  = {myname : "remiss", age:20, email: "asdasd"}

console.log(isLegal(obj));
 
--------------------------------------

interface People {
    name : string,
    age:number,
}

class Manager implements People {
    name : string;
    age : number;

    constructor(name:string, age:number){
        this.name = name;
        this.age = age;
    }
}

const obj = new Manager("Rocky",23)





//-------------------------- or operator - interesection

interface Admin {
    name : string;
    permissions : string
}

interface User {
    name : string;
    age : number
}
type UserOrAdmin = User | Admin   // cannot use permissions and age
type UserOrAdmin1 = User & Admin  // all name permissions and age can be used

function greet(user : UserOrAdmin){
    console.log(user.name);
    
}

function greet1(user : UserOrAdmin1){
    console.log(user.age);
    
}.

---------------------------------------


interface User {
    firstname : string
    lastname : string
    age : number
}

function sumOfAge(u1:User , u2:User){
    return u1.age+u2.age;
}

function isLegal(users : User[]){
    for(let i=0;i<users.length;i++){
        if(users[i].age > 18){
            console.log(users[i].firstname + ' ' + users[i].lastname + ' is legal user');
        }
        else{
            console.log(users[i].firstname + ' ' + users[i].lastname + ' is illegal user');
        }
    }
}

const v = [{
    firstname : "bhudev" ,
    lastname : "bhanp",
    age : 21
},{
    firstname : "bhu" ,
    lastname : "bhanp",
    age : 22
},{
    firstname : "remiss" ,
    lastname : "bhanp",
    age : 12
}]


isLegal(v);


---------------------------------------Pick and Partial

interface User {
    firstname : string
    lastname : string
    age : number
    email  : string
    mobNo : number
}

type premiumUser = Pick<User, 'firstname' | 'age' | 'mobNo'>

type premiumUserOptional = Partial<premiumUser>

function hel(u:premiumUserOptional){
    
}

---------------------------------------Readonly


interface User {
    firstname : string
    age : number
}

const user: Readonly<User> = {
    firstname : 'Bhudev',
    age : 21
}

//user.age = 12 // not allowed once Readonly used but can be done if readonly is not used


---------------------------------------------------excluded



type EventType = 'click' | 'scroll' | 'mousemove';

type ExcludedEvent = Exclude<EventType, 'scroll'>; // only 'click' and 'mousemove'

function eventHandler(event1: ExcludedEvent) {
    console.log("Handling event:", event1);
}


eventHandler('click') // works
eventHandler('mousemove') // works
//eventHandler('scroll') // dose not works begin exculded


*/ 
