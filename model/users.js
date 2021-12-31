const express=require("express")
const mongoose=require("mongoose");
const {Schema}=require("mongoose")
const { type } = require("os");
const { string } = require("prop-types");
const app=express();

//connect to db
// const db= mongoose.connect('root:root@mongodb://localhost/testlibrary?authSource=admin',{useNewUrlParser: true,useUnifiedTopology: true},()=>{
//     console.log("connected to database")
// })
const db=mongoose.connect('mongodb://localhost/btest');
// creating schema

const schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank1 = mongoose.model('Tank', schema);
var t1=mongoose.model("t1",schema)

// inserting an element into a mongodb

const u1= new Tank1({name: "vika",size:"10"})
u1.save((err,u1)=>{
    if (err) throw err;

})

const u2=new t1({name:"zikas"})
u2.save()




// app.get("/",(req,res,next)=>{
//     res.send("listning")
// })

app.listen(8080,console.log("listening"));