import express from "express";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// here we are going to create 2 routes 
// 1 for creating the signing up...
// 2 for creating the loging in... 

const router = express.Router();

router.post('/signup', async ( req , res ) => {
    try {
        const { username, email, password } = req.body;

        const findIfUsernameExists = await User.findOne({ username : username });
        
        if(findIfUsernameExists) {
            return res.status(401).json({
                message : "Username already exists"
            })
        }

        const findIfEmailExists = await User.findOne({ email : email });

        if(findIfEmailExists) {
            return res.status(401).json({
                message : "Email already exists"
            })
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password : hashpassword
        })

        res.status(200).json({
            message : "Successfully Signed UP",
            username : user.username,
            email : user.email
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Failed in Signing Up"
        })
    }
})


// now we are going to create the router for login

router.post("/login", async( req , res ) => {
    try {
        const { username, password } = req.body;

        const findIfUsernameExists = await User.findOne({ username : username });

        if(!findIfUsernameExists) {
            return res.status(401).json({
                message : "Username doesn't exits"
            })
        }

        const ifPasswordIsCorrect = await bcrypt.compare(password, findIfUsernameExists.password);

        if(!ifPasswordIsCorrect) {
            return res.status(401).json({
                message : "Incorrect Password"
            })
        }

        const token = await jwt.sign({ id : findIfUsernameExists._id }, process.env.JWT_SECRET, { expiresIn : "3h"});
        
        res.status(200).json({
            message : "Successfully Logged In",
            token : token,
            username : findIfUsernameExists.username,
            email : findIfUsernameExists.email
        })
        
    }

    catch ( err ) {
        res.status(404).json({
            message : "Login Failed"
        })
    }
})

export default router;