import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';


// function for the signup route
export const signup = async ( req , res ) => {
    try {
        const { username, email, password } = req.body;
        
        if(!username || !email || !password) {
            return res.status(400).json({
                message : "Missing Credentials"
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            username : username,
            email : email,
            password : hashedPassword,
            role : "user"
        })

        res.status(201).json({
            message : "Successfully Signed UP",
            username : createUser.username,
            email : createUser.email,
            role : createUser.role
        })

    }
    catch ( err ) {
        res.status(500).json({
            message : "Failed Signing Up. Please try again"
        })
    }
}


// Now we are going to create the signup route

export const login = async ( req, res ) => {
    try {
        const { username , password } = req.body;

        if(!username || !password ) {
            return res.status(401).json({
                message : 'Missing Credentials'
            })
        }

        const ifUserExists = await User.findOne({ username : username });

        if(!ifUserExists) {
            return res.status(401).json({
                message : "Username not present in the DATABASE"
            })
        }

        const checkPassword = await bcrypt.compare(password, ifUserExists.password);

        if(!checkPassword) {
            return res.status(401).json({
                message : "Incorrect Password"
            })
        }

        const token = await jwt.sign(
            { 
                id: ifUserExists._id,
                role: ifUserExists.role,
                username : ifUserExists.username
            }, 
            process.env.JWT_SECRET, 
            { 
                expiresIn : "4h"
            } 
        );

        res.status(201).json({
            message : "Successfully Logged In",
            username : username,
            token : token
        })

    }

    catch ( err ) {
        res.status(401).json({
            message : "Some error came in Loggin in..."
        })
    }
}