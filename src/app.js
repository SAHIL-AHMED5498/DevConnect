console.log("dev connect");

const { db } = require("../src/config/database")
const {user}= require("../src/models/user")
const {validateSignup, validateEmail}=require("../src/utils/validateSignup")
const {auth}=require("./middlewares/auth")

const express = require("express");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");



const app = express();
// Add this middleware to parse JSON and urlencoded body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//SIGN UP 
app.post("/signUp",async(req,res)=>{
 
    
try{
        //VALIDATE REQ DATA 

    if(!validateSignup(req)){
        return;
    }
    if(! await validateEmail(req.body.email)){
        return;
    }
       // ENCRYPT PASSWORD
    const hashPassword = await bcrypt.hash(req.body.password, 10);

  //INSTANCE OF DOCUMENT CREATED
    const User=new user({
        email:req.body.email,
        password:hashPassword,
        name:req.body.name,
        age:req.body.age,
        skills:req.body.skills,
        about:req.body.about,
        profileImg:req.body.profileImg
    })
  //SAVE TO THE DATABASE
    await User.save();


    //CREATE JWT TOKEN 
    const token=await User.getJWT();
    res.cookie("token",token);
    res.send(User);
   

 

}catch(err){
    console.log("error at server level "+err)
    res.status(400).send(err.message);
}

})

//SIGN IN 

app.post("/signIn",async(req,res)=>{

    try{
      
         //GET USER FROM DB
         const foundUser=await user.findOne({email:req.body.email}); 
        //CHECK IF EMAIL VALID 
        if(!foundUser){
            throw new Error("Email doesnt exist in db");
        }
        const isValidPass=await foundUser.validatePass(req.body.password)
           //CHECK IF PASSWORD VALID &  //SEND USER AS A RESPONSE
        if(isValidPass){

            //create a jwt token

            const token=await foundUser.getJWT(); //offload to schema method
            console.log(token);


            res.cookie("token",token);
            res.send(foundUser);
        }
        else{
            throw new Error("Password is invalid")
        }
        


   

 

  

    }
    catch(err){
        console.log("SignIn ERROR"+err);
        res.status(400).send("signIn Error"+err.message)
    }
   
})










//PROFILE API

app.get("/profile",auth,async(req,res)=>{

    const foundUser=req?.foundUser;
    res.status(200).send(foundUser);


}
)


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


