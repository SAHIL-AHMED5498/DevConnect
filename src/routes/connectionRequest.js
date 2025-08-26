const express = require("express");
const mongoose=require("mongoose")

const connectionRequestRoutes = express.Router();

const { connectionRequestModel } = require("../models/connectionRequest");
const { auth } = require("../middlewares/auth");
const { user } = require("../models/user");

//SEND CONNECTION REQUEST TO OTHER USER USING THEIR ID
connectionRequestRoutes.post("/request/send/:status/:toUserId", auth, async (req, res) => {

    try {
        //GET TOUSER ID
        const toUserId = req.params.toUserId;

        //GET STATUS
        const status = req.params.status;

        //GET LOGGEDIN USER
        const loggedInUser = req.foundUser;

        //LOGGEDIN USER ID
        const fromUserId = loggedInUser._id;

        //VALIDATE STATUS
        const allowedStatus = ["interested", "ignored", "rejected"];
        const isValidStatus = allowedStatus.includes(status);
         //CHECK IF STATUS IS VALID
        if (!isValidStatus) {
            throw new Error("Invalid Status Type");
        }

    
        //CHECK IF USER EXIST

        const userExist = await user.findOne({
            _id: toUserId

        })

        if (!userExist) {
            throw new Error("User not found")
        }
       

        //CHECK IF CONNECTION ALREADY EXIST

        const isExistConnection = await connectionRequestModel.findOne({
            $or: [
                { fromUserId:fromUserId, toUserId:toUserId,status:"interested"},
                { toUserId:fromUserId, fromUserId:toUserId,status:"interested" }
            ]
        }

        )

        if (isExistConnection) {
            throw new Error("Failed to send request as it already received first")


        }


        //SEND REQUEST AND SAVE IN DB

        const connectionReq = new connectionRequestModel({
            fromUserId,
            status,
            toUserId
        })

        const data = await connectionReq.save();

        const toUser = await user.findOne({ _id: toUserId })



        //GIVE RESPONSE

        res.json({ message: `req sent :${loggedInUser.name} is interested in ${toUser.name}`, data })
    }
    catch (err) {
        res.status(400).send(`Error : ${err.message}`)
    }




})



//ACCEPT CONNECTION REQUEST BY CONNECTION REQUEST ID
connectionRequestRoutes.post("/request/review/:status/:requestId",auth,async(req,res)=>{

    try{
        const loggedInUser=req.foundUser;
        const {status,requestId}=req.params;

        allowedStatus=["accepted","rejected"];
        //CHECK IF STATUS IS VALID
        const isValidStatus=allowedStatus.includes(status);
        if(!isValidStatus){
            throw new Error("STATUS NOT VALID")
        }
        console.log(loggedInUser._id);
        //FIND THE CONNECTION
        const connection=await connectionRequestModel.findOne({
            fromUserId:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
            
        })


        const connection2=await connectionRequestModel.findOne({
            fromUserId:requestId,
            toUserId:loggedInUser,
            status:"accepted"
            
        })

        if(connection2){
            throw new Error("ALREADY ACCEPTED")
        }


        if(!connection){
            throw new Error("ERROR , NO SUCH REQUEST FOR CONNECTION FOUND")
        }

        //UPDATE THE STATUS
        const str=connection.status=status;
        console.log(str);

        //SAVE INTO DB
        const data=await connection.save();

        res.status(200).json({message:`ACCEPTED REQ OF :${connection.fromUserId} `,data}
                                        
        )




        

       

    }
    catch(err){
        console.log(`Error :${err.message}`)
        res.status(400).send(`Error :${err.message}`);
    }
    
})

module.exports = { connectionRequestRoutes }