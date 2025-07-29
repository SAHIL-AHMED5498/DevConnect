require('dotenv').config();

const mongoose=require("mongoose");

const p=process.env.DB_PASSWORD;

const db=async ()=>{await mongoose.connect(`mongodb+srv://ahmedsahil5498:${p}@cluster0.z9lqp.mongodb.net/dev-connect`) }


const userSchema= new mongoose.Schema({

    name:{
        type:String,
    },
    age:{
        type:String,
    }
})



const user=mongoose.model("user",userSchema);


module.exports={db,user}

