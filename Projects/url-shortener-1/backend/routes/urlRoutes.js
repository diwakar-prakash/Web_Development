import express from "express";
import Url from "../models/Url.js";
import { nanoid } from "nanoid";

const router = express.Router();

// this is the shortner for the url

router.post('/convert', async ( req , res ) => {
    try {
        const { longUrl } = req.body;
        
        let url = await Url.findOne({ longUrl });
        if(url) {
            return res.status(200).json({ message : " The Url already exists.. "});
        }
        else {
            const urlCode = nanoid(2);
            const shortUrl = `${process.env.BASE}/${urlCode}`;

            url = new Url({
                longUrl,
                shortUrl,
                urlCode
            })

            await url.save();
            res.status(201).json({ message : `The shortner of the url has been created as ${url}`});
        }
    }
    catch ( err ) {
        res.status(404).json({ message : err.message });
    }
})


// from here, appko redirect kar diya jayega to your original link 

router.get('/:code', async ( req, res ) => {
    try {
        const hold = await Url.findOne({ urlCode : req.params.code });

        if( hold ) {
            return res.redirect(hold.longUrl);
        }
        else {
            return res.status(404).json({ message : "Bhai tera url code sahi nahi hai, aaisa kuch hamare database me exist nahi karta hai"});
        }
    }   
    catch ( err ) {
        res.status(500).json({ message : err.message });
    }
})

export default router;


