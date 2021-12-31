const express=require("express")
const mongoose=require("mongoose");
const {Schema}=require("mongoose")
const { type } = require("os");
const { string } = require("prop-types");
const app=express();

//连接数据库
const db=mongoose.connect('mongodb://172.21.2.236:27017/190110890317');
// 创建schema
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



app.listen(50317,console.log("listening"));