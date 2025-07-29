console.log("dev connect");

const { db,user } = require("../src/config/database")

const express = require("express");



const app = express();
// Add this middleware to parse JSON and urlencoded body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/createUser",async(req,res)=>{
        const {name,age}=req.params;
        console.log(name,age)

        const userInstance= new user({name,age});
        userInstance.save();
        await res.send("successfully created");
    
})




db()
    .then(
        () => {
            console.log("connected to the db")
            app.listen(3000, () => {
            console.log("running on : http://localhost:3000");
            })
        }
    )
    .catch((err) => {
        console.log("error while establishing connection")
    })


