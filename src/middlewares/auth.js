
const adminAuth=(req,res,next)=>{

    const {p}=req.query;
    const isAuthenticated=(p=="admin");

    if(!isAuthenticated){
        res.status(401).send("un authorised access");
    }
    else{
        next();
    }
}

const userAuth=(req,res,next)=>{

    const {p}=req.query;
    const isAuthenticated=(p=="user");

    if(!isAuthenticated){
        res.status(401).send("please , log in ");
    }
    else{
        next();
    }
}


module.exports={userAuth,adminAuth}