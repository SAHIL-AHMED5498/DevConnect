console.log("dev connect");
const { db } = require("../src/config/database")
const express = require("express");
const cookieParser=require("cookie-parser");
const {authRouter}=require("./routes/auth")
const {profileRouter}=require("./routes/profile");
const { connectionRequestRoutes } = require("./routes/connectionRequest");
const { userRouter } = require("./routes/user");
const cors=require("cors")

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";  // bind to all network interfaces

const allowedOrigins = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(",")
  : ["http://localhost:5173"];


const app = express();
app.use(cors({
   origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/",authRouter);  //AUTH ROUTER
app.use("/",profileRouter); //PROFILE ROUTER
app.use("/",connectionRequestRoutes) //CONNECTION REQ ROUTER
app.use("/",userRouter);//USER ROUTER

app.use("/",(req,res)=>{

    res.status(400).send("something wend wrong.path doesnt exist")
})






 db()
    .then(
        () => {
            console.log("connected to the db")
            app.listen(PORT ,HOST, () => {
              console.log(`🚀 Server running on port ${PORT}`);
            })
        }
    )
    .catch((err) => {
        console.log(`error while establishing connection ${err.message}`)
    })


