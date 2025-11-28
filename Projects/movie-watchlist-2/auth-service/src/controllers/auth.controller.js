import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signupStuff = async ( req , res , next ) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(401).json({
                message : "Missing Credentials in Signup"
            })
        }
        
        const ifUsernameExists = await User.findOne({ username : username });

        if(ifUsernameExists) {
            return res.status(401).json({
                message : "Username already exists. Please try with another one"
            })
        }

        const ifEmailExists = await User.findOne({ email : email });

        if(ifEmailExists) {
            return res.status(401).json({
                message : "Email Already Exists"
            })
        }

        const role = "user";

        const hashedPassword = await bcrypt.hash(password, 10);


        const userCreated = await User.create({
            username : username, 
            email : email,
            role : role,
            password : hashedPassword
        })

        res.status(201).json({
            message : "Successfully Signed Up",
            email : userCreated.email,
            username : userCreated.username
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "Error came while signing up"
        })
    }
}

export const loginStuff = async ( req, res, next ) => {
    try {
        const { username, password } = req.body;

        if( !username || !password ) {
            return res.status(401).json({
                message : "Missing Credentials while Logging In"
            })
        }

        const ifUsernameExists = await User.findOne({ username : username });

        if(!ifUsernameExists) {
            return res.status(401).json({
                message : "Invalid Username"
            })
        }

        const checkPassword = await bcrypt.compare(password, ifUsernameExists.password);

        if(!checkPassword) {
            return res.status(401).json({
                message : "Incorrect Password"
            })
        }

        const token = await jwt.sign(
            { 
                id : ifUsernameExists._id,
                role : ifUsernameExists.role 
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn : "4h"
            }
        );

        res.status(201).json({
            message : "Successfully Logged In",
            username : ifUsernameExists.username,
            token : token
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "Some Error came in loggin in. Please try again"
        })
    }
}