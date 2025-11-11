import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/signup", async ( req , res ) => {
    try {
        const { name , email , password } = req.body;

        const alreadyemail = await User.findOne({ email });

        if(alreadyemail) {
            return res.status(404).json({ message : " Bhai ye wala email already exist karta hai hamari website me ..."})
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const pushinfo = await User.create({
            name,
            email,
            password : hashedPassword
        })

        res.status(201).json({ 
            message : "User Created Successfully",
            username : pushinfo.name,
            useremail : pushinfo.email
        })
    }
    catch ( err ) {
        res.status(404).json({ message : err.message });
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email , password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({ message : "Bhaisahab, aap hamare database me door door tak nahi dikhayi de rahe hai..."});
        }
        const checkpassword = await bcrypt.compare(password, user.password);

        if(!checkpassword) {
            return res.status(404).json({ message : "Password Galat hai bhai, Please try again ... "});
        }
         
        const tokenbanao = jwt.sign({ id : user._id}, process.env.JWT_SECRET);
        res.status(201).json({ 
            message : "Bhai token ban gaya",
            token : tokenbanao,
            user : {
                userid : user._id,
                username : user.name,
                useremail : user.email
            }
        })
    }
    catch ( err ) {
        res.status(404).json({ message : err.message });
    }
})


// this route is for checking weather our backend is working or not. Thank you, namaste, jai hind...
router.get('/', (req, res) => {
    res.status(200).json({ message : " Ha bhai sab theek chal raha hai, ye wala bus subkuch check karne ke liye likha tha"})
})

export default router;