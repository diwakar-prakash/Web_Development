import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const signUp = async ( req , res ) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message : "Not enough credentials"
            })
        }

        const findIfEmailExists = await User.findOne({ email : email });

        if(findIfEmailExists) {
            return res.status(401).json({
                message : "Email already exists in the DATABASE. Try with another one"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            email : email,
            password : hashedPassword,
            role : "USER"
        })

        res.status(201).json({
            message : "The User has been created with the following email",
            email : createUser.email
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "SignUp Failed"
        })
    }
} 


// now for the longin

export const logIn = async ( req , res ) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message : "Insufficient Credentials"
            })
        }

        const ifEmailExists = await User.findOne({ email : email });

        if(!ifEmailExists) {
            return res.status(401).json({
                message : "Email doesn't exit, please sign up"
            })
        }

        const checkPassword = await bcrypt.compare(password, ifEmailExists.password);

        if(!checkPassword) {
            return res.status(401).json({
                message : "Incorrect Password"
            })
        }

        const token = await jwt.sign({ userId : ifEmailExists._id, role : ifEmailExists.role }, process.env.JWT_SECRET, { expiresIn : "5h"})

        res.status(201).json({
            message : "Successfully Logged In",
            email : email,
            token : token
        })
    }
    catch ( err ) {
        return res.status(500).json({
            message : "Login Failed"
        })
    }
}

// now we are going to make a route for verifying the token

export const verify = async ( req , res ) => {
    try {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(400).json({ valid: false })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        res.json({
            valid: true,
            userId : decoded.userId,
            role: decoded.role
        });
    }
    catch ( err ) {
        res.status(401).json({
            valid : false
        })
    }
}