const mongoose = require("mongoose");
const validator=require('validator');
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Email is invalid")
        }
      }
    },
    password:{
      type:String,
      required:true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Password is not strong")
        }
      }
    },

    name: { type: String, required: true },

    profileImg: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
           validate(value){
        if(!validator.isURL(value)){
          throw new Error("Url is invalid")
        }
      }
    },

    age: {
      type: Number,
      min: 18,
      required: true,
    },

    skills: {
      type: [String],
      validate(value){
        if(value.length>=10){
            throw new Error("skills should be less than 10");
        }
      }
    },

    about: {
      type: String,
      default: "hello i m new user ",
    },

  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

module.exports = { user };
