import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get('/', async ( req , res ) => {
    try {
        const cat = await Category.find();
        res.status(200).json(cat);
    }
    catch(err) {
        res.status(404).json({ message : err.message });
    }
})

router.post('/', async ( req, res) => {
    try {
        const cat = await Category.create(req.body);
        res.status(201).json(cat);
    }
    catch(err) {
        res.status(500).json({ message : "The category has not been added due to some problem. Please try again after some time..."});
    }
})

router.put('/:id', async( req, res ) => {
    try {
        const cat = await Category.findByIdAndUpdate(req.params.id , req.body, {new : true , runValidators : true});
        res.status(200).json(cat);
    }
    catch(err) {
        res.status(404).json({ message : err.message });
    }
})

export default router;