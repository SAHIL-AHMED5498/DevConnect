const mongoose=require("mongoose");
const {user}=require("../models/user")


const connectionRequestSchema=new mongoose.Schema({


    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:user
    },
        toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:user
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","rejected","accepted"],
            message:`{VALUE} is incorrect status type`,
        },
        required:true
    }
})

connectionRequestSchema.index({toUserId:1,fromUserId:1})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
        throw new Error("cannot sent request to itself");
    }

    next();
})

const connectionRequestModel=new mongoose.model("connectionRequest",connectionRequestSchema);

module.exports={connectionRequestModel}