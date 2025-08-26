const express=require("express");
const {auth}=require("../middlewares/auth");
const {validateEditData, sanitizeEditData}=require("../utils/validateEditData")

const profileRouter=express.Router();

//PROFILE API

//GET USER PROFILE
profileRouter.get("/profile/view",auth,async(req,res)=>{

    const foundUser=req?.foundUser;
    res.status(200).send(foundUser);


}
)

//EDIT USER PROFILE DATA
profileRouter.patch("/profile/edit",auth,async(req,res)=>{

try{
    //VALIDATE UPDATE DATA
    if(!validateEditData(req.body)){
        throw new Error("Update not allowed");
    }
    //SANITIZE EDIT DATA
    if(!sanitizeEditData(req.body)){
        throw new Error("Invalid Edit Data")
    }

    //GET USER FROM DB

    const loggedInUser=req.foundUser;

    //UPDATE THE USER
    Object.keys(req.body).forEach(feild=>loggedInUser[feild]=req.body[feild]);

    //SAVE TO DB
   await loggedInUser.save();


     res.status(200).send(loggedInUser)

}
catch(err){
    res.status(400).send(`Edit Error ${err.message}`)
}
    
})

//EDIT USER PASSWORD 
profileRouter.patch("/profile/edit/pass",(req,res)=>{

res.status(200).send("under development");
    
})


module.exports={profileRouter}

