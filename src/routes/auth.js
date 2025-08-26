const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignup, validateEmail } = require("../utils/validateSignup");
const { user } = require("../models/user");

const authRouter = express.Router();

//SIGN UP
authRouter.post("/signUp", async (req, res) => {
  try {
    //VALIDATE REQ DATA

    if (!validateSignup(req)) {
      return;
    }
    if (!(await validateEmail(req.body.email))) {
      return;
    }
    // ENCRYPT PASSWORD
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    //INSTANCE OF DOCUMENT CREATED
    const User = new user({
      email: req.body.email,
      password: hashPassword,
      name: req.body.name,
      age: req.body.age,
      skills: req.body.skills,
      about: req.body.about,
      profileImg: req.body.profileImg,
    });
    //SAVE TO THE DATABASE
    await User.save();

    //CREATE JWT TOKEN
    const token = await User.getJWT();
    res.cookie("token", token,{httpOnly:true,secure:false,sameSite:"Lax"});
    res.send(User);
  } catch (err) {
    console.log("error at server level " + err);
    res.status(400).send(err.message);
  }
});

//SIGN IN

authRouter.post("/signIn", async (req, res) => {
  try {
    //GET USER FROM DB
    const foundUser = await user.findOne({ email: req.body.email });
    //CHECK IF EMAIL VALID
    if (!foundUser) {
      throw new Error("Email doesnt exist in db");
    }
    const isValidPass = await foundUser.validatePass(req.body.password); //offload to schema method
    //CHECK IF PASSWORD VALID &  //SEND USER AS A RESPONSE
    if (isValidPass) {
      //create a jwt token

      const token = await foundUser.getJWT(); //offload to schema method

      res.cookie("token", token,{
  httpOnly: true,
  sameSite: "Lax",   // or "None" if using cross-site with HTTPS
  secure: false,     // set true only in production with HTTPS
});
      res.send(foundUser);
    } else {
      throw new Error("Password is invalid");
    }
  } catch (err) {
    console.log("SignIn ERROR" + err);
    res.status(400).send("signIn Error" + err.message);
  }
});

//LOGOUT

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ message: "logged out successfully" });
  } catch (err) {
    res.status(400).send(`Error Logout :${err.message}`);
  }
});

module.exports = { authRouter };
