import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// here we are going to create 2 routes
// 1. for the signup 
// 2. for the login stuff 

const router = express.Router();

router.post("/signup", async ( req , res ) => {
    try {
        const { username, email, password } = req.body;

        const findIfUsernameExists = await User.findOne({ username });

        if(findIfUsernameExists) {
            return res.status(401).json({
                message : "Username already exists, please choose another one"
            })
        }

        const findIfEmailExists = await User.findOne({ email });

        if(findIfEmailExists) {
            return res.status(401).json({
                message : "Email already exists, Please choose another one"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            username,
            email,
            password : hashedPassword
        })

        res.status(201).json({
            message : "Successfully Signed Up",
            username : createUser.username,
            email : createUser.email
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error came in creating the user, Please try again"
        })
    }
})


// now we are going to create the login stuff

router.post('/login', async ( req, res ) => {
    try {
        const { username, password } = req.body;

        const ifUsernameExists = await User.findOne({ username });

        if(!ifUsernameExists) {
            return res.status(401).json({
                message : "Invalid Username provided"
            })
        }

        const correctPassword = await bcrypt.compare(password, ifUsernameExists.password);

        if(!correctPassword) {
            return res.status(401).json({
                message : "Incorrect Password Entered"
            })
        }

        const token = jwt.sign({ id : ifUsernameExists._id }, process.env.JWT_SECRET, {expiresIn : "3h"});

        res.status(200).json({
            message : "Successfully Logged In",
            token : token,
            username : ifUsernameExists.username,
            email : ifUsernameExists.email
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error occured while loggin in. Please try again.."
        })
    }
})

export default router;