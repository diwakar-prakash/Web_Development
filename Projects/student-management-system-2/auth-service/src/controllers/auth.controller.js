import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signupThing = async ( req, res ) => {
    try {
        const { name , email , password, role } = req.body;

        if(!name || !email || !password) {
            return res.status(401).json({
                message : "Invalid Credentials"
            })
        }

        const ifEmailExists = await User.findOne({ email : email });

        if(ifEmailExists) {
            return res.status(401).json({
                message : "Username already exists"
            })
        }

        if(role == "admin") {
            return res.status(401).json({
                message : "you can't be an admin."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            name : name,
            email : email,
            password : hashedPassword
        })

        res.status(201).json({
            message : "Successfully Signed Up",
            name : createUser.name,
            email : createUser.email
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Some error came in Signing up"
        })
    }
}


export const loginThing = async ( req , res ) => {
    try {
        const { email , password } = req.body;

        if(!email || !password) {
            return res.status(401).json({
                message : "Invlid Credentials "
            })
        }

        const findIfValidEmail = await User.findOne({ email : email });

        if(!findIfValidEmail) {
            return res.status(401).json({
                message : "Email not found in the database"
            })
        }

        const comparePassword = await bcrypt.compare(password, findIfValidEmail.password);

        if(!comparePassword) {
            return res.status(401).json({
                message : "You entered WRONG password"
            })
        }

        const token = await jwt.sign(
            {
                id : findIfValidEmail._id,
                role : findIfValidEmail.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "4h"
            }
        )

        res.status(201).json({
            message : "Successfully Logged in ",
            email : email,
            token : token
        })

    }
    catch ( err ) {
        res.status(500).json({
            message : "Error logging in"
        })
    }
}
