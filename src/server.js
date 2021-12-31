// 引进相关包
const mongoose=require("mongoose")
const express=require("express");
const { number } = require("prop-types");

// 引进 express-session
var session=require("express-session");
var cookieParser=require("cookie-parser");

// storing session into db
var MongoSession = require("connect-mongodb-session")(session);

// importing bcrypt for hashing the password
const bcrypt=require("bcrypt");

const app =express();
const port=process.env.PORT || 50317;//端口号

//连接数据库
var db=mongoose.connect('mongodb://172.21.2.236:27017/190110890317');

//创建Schema
var schema =mongoose.Schema({
    
    firstname:String,
    lastName:String,
    gender:String,
    city:String,
    mobile:String,
    useremail:String,
    password:String
    
})

// 创建表
var register=mongoose.model("Register",schema);

//创建模型
var schema1 =mongoose.Schema({
    title:String,
    author:String,
    isbn:Number,
    link:String

})
//创建表
var books=mongoose.model("books",schema1);

//创建模型
var adminschema=mongoose.Schema({
    useremail:String,
    password:String
})
//创建表
var adminmod=mongoose.model("Admin",adminschema)
//管理员账号
var admin1=new adminmod({useremail:"123",password:"1234"})
admin1.save()

//fetching or excessing form 
app.use(express.urlencoded({extended:false})) 

// 路由 
//设置模板引擎 "ejs"
app.set("view engine","ejs");

//在ejs文件中添加样式，首先创建一个公共文件夹，然后使其成为静态文件夹
app.use(express.static("public"))

app.use(session({
    key:"user_email",
    secret:"secerts",
    resave:false,
    saveUninitialized:false,
    //store:store,
    cookie:{
        maxAge:60000
    }
}))

app.get("/login.ejs",(req,res)=>{
    res.render('login.ejs')
})  
var isAuthAdmin=(req,res,next)=>{
    if(req.session.isAuth==true){
        next()
    } else{
        res.redirect("admin.ejs")
    }
}

var isAuthUser=(req,res,next)=>{
    if(req.session.isAuthUser==true){
        next()
    } else{
        res.redirect("login.ejs")
    }
}



app.get("/",(req,res)=>{
    
   
    res.render('index.ejs')
    
})
app.get("/about.ejs",(req,res)=>{
    res.render('about.ejs')
})


app.get("/libraryuser.ejs",isAuthAdmin,(req,res)=>{
     books.find({},(err,data)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log(data)
            res.render("libraryuser.ejs",{datas:data})
        }   
    })

})

//管理员界面
app.get("/admin.ejs",(req,res)=>{
    
    res.render('admin.ejs')
})


app.get("/register.ejs",(req,res)=>{
    res.render('register.ejs')
})

// userlibrary界面
app.get("/userlibrary.ejs",isAuthUser,(req,res)=>{
    books.find({},(err,data)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log(data)
            res.render("userlibrary.ejs",{datas:data})
        }   
    })

})



msg=""
var loginFlag=0;
var usercorrect=0


app.post("/login.ejs", async (req,res)=>{
    console.log(req.body.useremail,req.body.pass)
    

    try{
       const email=await register.findOne({useremail:req.body.useremail}).catch(()=>{
       });
       console.log(email)
       console.log("entered email",req.body.useremail,"entered")
       let checkpass= await bcrypt.compare(req.body.pass,email.password)
      
       if (checkpass){
            console.log('u haved logged in')
            loginFlag=1
            req.session.isAuthUser=true;
            req.session.isAuth=false
           

            books.find({},(err,data)=>{
                if (err){
                    console.log(err)
                }
                else{
                    console.log(data)
                    req.session.isAuthuser=true;
                    console.log(req.session)
                    res.render("userlibrary.ejs",{datas:data})
                }   
            })

       }
       else if (req.body.useremail==email.useremail){
        usercorrect=1
       }


        }
        catch(e){
        
            res.render('login',{msg:"You have not registered"})

        }


    if (usercorrect==1){
        usercorrect=0;
        res.render('login',{msg:"password incorrect"})

    }
   
})

// post request for admin

app.post("/admin.ejs", async (req,res)=>{
    console.log(req.body.useremail,req.body.pass)
    

    try{
        adminmod.find({},(err,data)=>{
            console.log(data,"h")
        })
       const email=await adminmod.findOne({useremail:req.body.useremail}).catch(()=>{
       });
       console.log(email.password,"hii")
       console.log("entered email",req.body.useremail,"entered")
       let checkpass= email.password==req.body.pass;
       console
       if (checkpass){
            console.log('u haved logged in')
            loginFlag=1
            req.session.isAuth=true 
            req.session.isAuthUser=false;
            
           
           
            res.redirect("libraryuser.ejs")

       }
       else if (req.body.useremail==email.useremail){
        usercorrect=1
       }


        }
        catch(e){
        
            res.render('admin',{msg:"You are not a Admin"})

        }


    if (usercorrect==1){
        usercorrect=0;
        res.render('admin',{msg:"password incorrect"})

    }
   
})



app.post("/register.ejs",async (req,res)=>{
    console.log("reg")

    
    const newUser= await register.findOne({useremail:req.body.useremail}).catch((err)=>{
        
    }) 
    console.log(newUser,"jjs")
    if (newUser==undefined){
        
        
    let match=req.body.pass==req.body.pass1;
    console.log("   ",req.body.pass1,' hi  ',req.body.pass)
    
    console.log(match,"ashag")
    if (match){
        try{

            let password1=await bcrypt.hash(req.body.pass1,10)
           
            let user1=new register({
                firstname:req.body.fname,
    lastName:req.body.lname,
    gender:req.body.gender,
    city:req.body.city,
    mobile:req.body.mobile,
    useremail:req.body.useremail ,
    password:password1
    
    
            });
            console.log()
            user1.save().then(()=>{console.log("saved")}).catch(()=>{});
            
            res.redirect('login.ejs');
        }
        catch{
            res.redirect('register.ejs');
        }
    }
    else{
        res.render('register.ejs',{msg:"password do not matched"});
    }


    }
    else{
        res.render('register.ejs',{msg:"email already exists"});
    }
   


    
})

app.post("/libraryuser.ejs",async (req,res)=>{
    console.log("post")
    
    let book=new books({title:req.body.title,author:req.body.author,isbn:req.body.isbn,link:req.body.link})
    let t1=book.title;
    let a1=book.author;
    let i=String(book.isbn);
    let linkk=book.link
    
    
    
    if (t1.trim().length==0 ||a1.trim().length==0 || i.trim().length==0 ||linkk.trim().length==0){
       return res.redirect("libraryuser.ejs")
    }
    else{
        var found= await books.findOne({isbn:req.body.isbn}).catch((err)=>{})
    }

    
    if (found==null){
        

            book.save().then(()=>{
                console.log("added")
            }).catch(()=>{
                console.log("not")
            })
            req.body.title="";
            req.body.author="";
            req.body.isbn="";
            req.body.link="";
        
    }
    res.redirect("libraryuser.ejs")
})
// deleteing particular record from the book
app.get("/delete/:id", (req,res)=>{
    let id=req.params.id;
    try{

        books.deleteOne({_id:id}).then(()=>{
            res.redirect("/libraryuser.ejs")
        })
        

        console.log(deleted)
            
        
    }
    catch{
    }
    
})

app.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if (err) throw err;
        res.redirect("/")
    })
})


app.listen(port);