import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";


const router = express.Router();

router.post("/signup", async ( req , res ) => {
    try {
        const { username, email, password } = req.body;

        const doesUsernameExists = await User.findOne({ username });

        if(doesUsernameExists) {
            return res.status(401).json({ message : "The username already exists. Please try another username..."});
        }

        const doesEmailExists = await User.findOne({ email });

        if(doesEmailExists) {
            return res.status(401).json({ message : "The email already exists. Please try another email..."});
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = await User.create({
            username,
            email,
            password : hashedPassword
        })

        res.status(201).json({ 
            message : "Successfully Signed UP",
            users_username : newUser.username,
            users_email : newUser.email
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error while signing up..."
        })
    }
})


router.post('/login', async ( req , res ) => {
    try {
        const { email , password } = req.body;

        const doesEmailExists = await User.findOne({ email });

        if(!doesEmailExists) {
            return res.status(401).json({ 
                message : "No user exists with the email provided by you sir.. Please try with the correct email"
            })
        }

        const correctPassword = await bcrypt.compare(password, doesEmailExists.password);

        if(!correctPassword) {
            return res.status(401).json({ 
                message : "Wrong Password, Please enter the password again"
            })
        }

        const token = await jwt.sign({id : doesEmailExists._id}, process.env.JWT_SECRET, { expiresIn : "2h" });
        res.status(201).json({
            message : "Successfully Logged In",
            token,
            users_username : doesEmailExists.username,
            users_email : doesEmailExists.email
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Login Failed, Some error came.."
        })
    }
})

export default router;