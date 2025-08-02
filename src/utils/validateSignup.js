
const validator=require("validator");
const {user}=require("../models/user")

const validateEmail=async(email)=>{
      const existingUser = await user.findOne({ email });

    if (existingUser) {
      throw new Error("Email already in use");
    }
    else {return true;}

}
const validateSignup=(req)=>{

    const {email,password,name,age,about,skills,profileImg}=req.body

    if(!validator.isEmail(email)){
        throw new Error("Enter Valid Email")
    }
    
        
    
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong")
    }
    else if(!validator.isURL(profileImg)){
        throw new Error("img url not valid")
    }
    else if(name.length<4){
        throw new Error("name must be atleast 5 characters")
    }
    else if(skills.length<=2){
        throw new Error("should have more than 2 skills")
    }
    else if(age<=17){
        throw new Error("Age should be greater than 18")
    }
    else if(!about){
        throw new Error("About field must be present")
    }
    else{
        return true;
    }

   // console.log(email,password,name,age,about,skills,profileImg);

}

module.exports={validateSignup,validateEmail}