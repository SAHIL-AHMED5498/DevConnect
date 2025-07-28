console.log("dev connect");

const express=require("express");

const app=express();

app.use(express.json());


//send user data
app.get("/user/:id",(req,res)=>{
//    console.log(req.query);             //for query
//    console.log(req.params);          //for parameters
    res.send({name:"sahil",age:24,id:req.params.id});
})

//create user data
app.post("/user",(req,res)=>{

    //saved to db

    res.send("saved successfully")
})

//delete user data
app.delete("/user",(req,res)=>{

    //delete from db

    res.send("successfully deleted");

})


//multi route

app.use("/multiRoutes",
    (req,res,next)=>{
        console.log("response handler 1");
        next();
    },
    (req,res,next)=>{
        console.log("response handler 2");
        next();
        console.log("this will print after response handler 3 out of execution stack");
    },
    (req,res,next)=>{
        console.log("response handler 3");

        res.send("response handler 3 ");
        console.log("last line of response handler 3");

    }
)




app.listen(3000,()=>{
    console.log("running on : http://localhost:3000");
})