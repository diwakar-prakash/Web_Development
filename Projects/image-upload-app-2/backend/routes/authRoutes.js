import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();


// the signup thing is here

router.post("/signup", async ( req , res ) => {
    try {
        const { username, email, password } = req.body;

        const correctEmail = await User.findOne({email});

        if(correctEmail) {
            return res.status(404).json({ message : "The email already exists "});
        }

        const hashedPassword = await bcrypt.hash(password, 3);

        const newUser = await User.create({
            username, 
            email,
            password : hashedPassword
        })

        res.status(201).json({
            message : "Successfully Signed Up",
            usersusername : newUser.username,
            usersemail : newUser.email
        })
    }
    catch ( err ) {
        res.status(404).json({ message : "Problem in signing up.."});
    }
})


// now we are creating for the signing up, here we are also going to bring the jwt token thing

router.post('/login', async( req, res ) => {
    try {
        const { email, password } = req.body;

        const findEmail = await User.findOne({email});

        if(!findEmail) {
            return res.status(404).json({ message : "Email not found, please sign up via the current email.."});
        }

        const correctPassword = await bcrypt.compare(password, findEmail.password);

        if(!correctPassword) {
            return res.status(404).json({ message : "Wrong Password entered. RETRY..."});
        }

        const token = await jwt.sign({ id : findEmail._id}, process.env.JWT_SECRET, {expiresIn : "2h"});
        res.status(200).json({
            message : "Successfully Logged INN..",
            usersemail : findEmail.email,
            userusersname : findEmail.username,
            t_token : token
        })
    } 
    catch( err ) {
        res.status(404).json({ message : "Something error came in signing up. Please Try Again"});
    }
})


// just created the following get route for checking weather the application is working or not

router.get('/', ( req, res) => {
    res.status(200).json({
        message : " Things are running fine diwakar prakash "
    })
})

export default router;