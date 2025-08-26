const jwt=require("jsonwebtoken");
const {user}=require("../models/user");


 const auth=async(req,res,next)=>{
//Extract token from the req body
const cookie=req?.cookies;
const {token}=cookie;
try{

   
 //Verify token
const decodedObj=await jwt.verify(token,"jwtwebtokensecret");

const {_id}=decodedObj;

//find user 
const foundUser=await user.findById(_id)

if(!foundUser){
    throw new Error("user not found , try again")
}
//SET USER
req.foundUser=foundUser;
next();

}
catch(err){
    res.status(401).send(`Auth Error ${err?.message}`);
}



}


module.exports={auth}