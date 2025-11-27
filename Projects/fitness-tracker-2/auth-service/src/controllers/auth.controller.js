import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const signup = async ( req , res ) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({
                message : "All fields are required"
            })
        }
        
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

        const hashPassword = await bcrypt.hash(password, 10);

        const userCreate = await User.create({
            username,
            email,
            password : hashPassword
        })

        res.status(201).json({
            message : "Successfully Signed UP",
            username : userCreate.username,
            email : userCreate.email
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Signup Failed"
        })
    }
}

export const login = async ( req , res ) => {
    try {
       const { username, password } = req.body;

       const ifUsernameExists = await User.findOne({ username : username });

       if(!ifUsernameExists) {
        return res.status(401).json({
            message : "Username doesn't exists"
        })
       }

       const findPassword = await bcrypt.compare(password, ifUsernameExists.password);

       if(!findPassword) {
        return res.status(401).json({
            message : "Incorrect Password"
        })
       }

       const token = await jwt.sign({ id : ifUsernameExists._id }, process.env.JWT_SECRET, {expiresIn : "3h"});

       res.status(201).json({
        message : "Successfully Logged In",
        username : username,
        token : token
       })

    }
    catch ( err ) {
        res.status(401).json({
            message : "Login Failed"
        })
    }
}
