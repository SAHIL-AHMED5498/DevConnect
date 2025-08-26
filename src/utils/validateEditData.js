


const validateEditData=(user)=>{


    const allowedUpdateFeild=["name","age","skills","about","profileImg"];

   const isValidEditData= Object.keys(user).every(feild=>allowedUpdateFeild.includes(feild));

   return isValidEditData;




    




}

const sanitizeEditData=(user)=>{
    const {name,skills,about}=user

      if(name!=null&&name.length<4 )
        throw new Error("name must be atleast 5 characters")
    
    else if(skills!=null&&skills.length<=2){
        throw new Error("should have more than 2 skills")
    }
     else if(about!=null&&!about){
        throw new Error("About field must be present")
    }
    else if (user.age != null && user.age < 18) {
  throw new Error("Age must be at least 18");
}
    else{
        return true
    }
}

module.exports={validateEditData,sanitizeEditData}