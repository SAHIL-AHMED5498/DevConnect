const express=require("express");
const userRouter=express.Router();

const {auth}=require("../middlewares/auth")
const {connectionRequestModel}=require("../models/connectionRequest");
const { user } = require("../models/user");



//FIND ALL THE CONNECTION REQUEST USER HAVE RECIEED
userRouter.get("/user/recieved/requests", auth, async (req, res) => {
    try {

        //GET LOGGEDIN USER
        const user = req.foundUser;

        //FIND ALL ITS REQUEST FROM CONNECTIONMODEL IN DB
        const data = await connectionRequestModel.find({ toUserId: user._id,status:"interested" }).populate("fromUserId", "name age skills about profileImg")


        //RETURN OR SENT RESPONSE TO USER

        res.send(data)


    }
    catch (err) {
        res.status(400).send(`ERROR ${err.message}`);
    }

})

//ALL THE CONNECTION OF THE LOGGED IN USER
userRouter.get("/user/connections",auth,async (req,res)=>{
try{
    //GET THE LOGGED IN USER
const loggedinUser=req.foundUser;

//FIND BY ID OF ALL IDS WHERE FROMUSER AND TO USER IS LOGGED IN USER
const connections=await connectionRequestModel.find({
    $or:[
        {toUserId:loggedinUser._id,status:"accepted"},
         {fromUserId:loggedinUser._id,status:"accepted"},
    ]
}).populate("toUserId","name age about profileImg").populate("fromUserId","name age about profileImg");

//SEND ONLY THE REQUIRED DATA TO LOGGEDIN USER
const data=connections.map((connection)=>{
    if(connection.toUserId._id.toString()===loggedinUser._id.toString()){
        
        return connection.fromUserId
    }
    else{
        return connection.toUserId
    }
})





res.status(200).send(data)

}
catch(err){
    res.status(400).send(`ERROR ${err.message}`)
}






})

//FEED OF LOGGED IN USER

userRouter.get("/user/feed",auth,async(req,res)=>{
    try{
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||10

        if(limit>50){
            throw new Error("not allowed limit")
        }

        const loggedInUser=req.foundUser;
        const connections=await connectionRequestModel.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
        }).select("fromUserId toUserId")

        const hideUserFromFeed=new Set()
        connections.forEach((connection)=>{
            hideUserFromFeed.add(connection.toUserId.toString());
             hideUserFromFeed.add(connection.fromUserId.toString());
        })
       // console.log(hideUserFromFeed)
        
        const feedUser=await user.find({

          $and:[
            {_id: {$nin:Array.from(hideUserFromFeed)}},
            {_id:{$ne:loggedInUser._id}}


          ] ,


        }).select("name age about profileImg _id ").skip((page-1)*limit).limit(limit);

        res.json({feedUser})


    }
    catch(err){
        res.status(400).send(`ERROR ${err.message}`)
    }
})
    

module.exports={userRouter}