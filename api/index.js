const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

// mongodb+srv://maydwellj:<password>@cluster0.2zqrx7b.mongodb.net/

mongoose.connect("mongodb+srv://maydwellj:joe@cluster0.2zqrx7b.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log("Connected to MongoDB")

}).catch((err) => {
    console.log("Error connecting to MongoDB", err)
});

app.listen(port, () => {
    console.log(port);
    console.log("Server is running on port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");

//function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
    //create nodemailer transport
    const transporter = nodemailer.createTransport({
        //configure the email service
        service: "gmail",
        auth: {
            user: "joemaydwell979@gmail.com",
            pass: "dmea osae yxjh kbdq",
        },
    });

    //compose the email message
    const mailOptions = {
        from: "rumie.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: http://localhost:98/verify/${verificationToken}`,
    };


    //send the email
    try{
        await transporter.sendMail(mailOptions)
    }catch(error){
        console.log("Error sending verification email", error)
    }
}; 

//endpoint to register in the app
app.post("/register", async(req, res) => {
    try{
        const {name,email,password} = req.body;

        //check if the email is already registered
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already registered"});
        }

        //create a new User
        const newUser = new User({name,email,password});

        //generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        //save the user to the database
        await newUser.save();

        //send verification email to user
        sendVerificationEmail(newUser.email,newUser.verificationToken);

    }catch(error){
        console.log("error registering user", error);
        res.status(500).json({message:"Registration failed"})
    }
});

//endpoint to verify the email
app.get("/verify/:token",async(req,res) => {
    try{
        const token =req.params.token;

        //find the user with the given verification token
        const user = await User.findOne({verificationToken: token});
        if(!user){
            return res.status(404).json({message:"Invalid verification token"})
        }

        //Mark the user as verified 
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({message:"Email verified successfully"})
    }catch(error){
        res.status(500).json({ message: "Email Verification Failed" });

    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(20).toString("hex");

    return secretKey;
}

const secretKey = generateSecretKey();

//endpoint ot login the user
app.post("/login",async(req, res) =>{
    try{
        const {email,password} = req.body;

        //check if the user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        }

        //check if the password is correct
        if(user.password !== password){
            return res.status(401).json({message:"Invalid password"});
        }

        //generate a token
        const token = jwt.sign({userId:user._id},secretKey)

        res.status(200).json({token})
    }catch(error){
        res.status(500).json({message:"Login Failed" })
    }
});

app.post("/cart", async(req, res) => {
    try{
        console.log("req.body", req.body.id);
        User.updateOne(
            {email:req.body.userEmail},
            {$push:{cart:{id:req.body.item.id}}}
          )
          .then((response) => {
            // Success response
            console.log("response", response);
            res.status(200).send(response);
          })
          .catch((error) => {
            // Error formatting (401) goes here
            res.status(500).json({message:"error updating database" })
          })
    }catch(error){
        console.log("error message", error)
        res.status(500).json({message:"function error in cart endpoint" })
    }
});