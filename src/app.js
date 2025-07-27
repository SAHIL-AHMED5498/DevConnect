console.log("dev connect");

const express=require("express");

const app=express();

app.use(express.json());

app.use("/login",(req,res)=>{
    res.send("youre in login page")
})
app.use("/createUser",(req,res)=>{
    res.send("youre in create user page")
})

app.post("/api/data",(req,res)=>{
    
    console.log(JSON.stringify(req.body) );

    res.status(201).json({message:"data recieved",data:req.body})
})

app.use("/",(req,res)=>{

    res.send("hello world");
})

app.listen(3000,()=>{
    console.log("running on : http://localhost:3000");
})