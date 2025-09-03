console.log("dev connect");
const { db } = require("../src/config/database")
const express = require("express");
const cookieParser=require("cookie-parser");
const {authRouter}=require("./routes/auth")
const {profileRouter}=require("./routes/profile");
const { connectionRequestRoutes } = require("./routes/connectionRequest");
const { userRouter } = require("./routes/user");
const cors=require("cors")
const app = express();
const {sendEmail} =require("./utils/sesClient");

const allowedOrigins = [
  "http://54.158.140.53",
  "http://localhost:5173"
];



app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";  // bind to all network interfaces

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/",authRouter);  //AUTH ROUTER
app.use("/",profileRouter); //PROFILE ROUTER
app.use("/",connectionRequestRoutes) //CONNECTION REQ ROUTER
app.use("/",userRouter);//USER ROUTER

app.post("/test-email", async (req, res) => {
  try {
    const { email } = req.body;

    await sendEmail({
      to: email,
      subject: "Test Email from DevConnect 🚀",
      html: "<h1>Hello!</h1><p>This is a test email using AWS SES.</p>",
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use("/",(req,res)=>{

    res.status(400).send("something went wrong..path doesnt exist")
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


