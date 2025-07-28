console.log("dev connect");

const express=require("express");
const {adminAuth,userAuth}=require("./middlewares/auth");

const app=express();

app.use("/admin",adminAuth);

app.get("/admin/users",(req,res)=>{
    res.send("all users data");
})

app.delete("/admin/users/:id",(req,res)=>{
    const uid=req.params.id
    res.send(`user of id ${uid} is deleted`);
})

app.get("/user/:id",userAuth,(req,res)=>{
    
    const uid=req.params.id;
    res.send(`user of id ${uid} data is given`);
})






app.listen(3000,()=>{
    console.log("running on : http://localhost:3000");
})