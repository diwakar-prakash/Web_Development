import argon2 from "argon2";
import User from "../models/user.model.js";
import generateToken from "../utils/jwt.js";

export const signup = async ( req , res ) => {
    try {
        const { email, password } = req.body;

        if(!email || !password ) {
            return res.status(400).json({
                message : "Credentials missing"
            })
        }

        const ifEmailExists = await User.findOne({ email });

        if(ifEmailExists) {
            return res.status(401).json({
                message : "Email already Exists in the database"
            })
        }

        const hashedPassword = await argon2.hash(password);

        const createUser = await User.create({
            email,
            password: hashedPassword,
            provider: "local"
        });

        res.status(201).json({
            message : "User created",
            email : createUser.email
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "Error came in Signing Up"
        })
    }
}


export const login = async ( req , res ) => {
    try {
        const { email , password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message : "Credentials missing"
            })
        }

        const ifEmailExists = await User.findOne({ email });

        if(!ifEmailExists) {
            return res.status(401).json({
                message : "No username with this email"
            })
        }

        const checkPassword = await argon2.verify(password, ifEmailExists.password);

        if(!checkPassword) {
            return res.status(401).json({
                message : "Incorrect Password"
            })
        }

        const token = await generateToken({
            userId: ifEmailExists._id,
            role: ifEmailExists.role
        })

        res.status(201).json({
            message : "Successfully Logged In",
            email: ifEmailExists.email,
            token: token
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "Error in Loggin In"
        })
    }
}