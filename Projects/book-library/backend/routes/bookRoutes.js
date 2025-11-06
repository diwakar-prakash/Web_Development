import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

router.get('/', async ( req , res ) => {
    try {
        const book = await Book.find().populate("category", "name");
        res.status(200).json(book);
    }
    catch(err) {
        res.status(404).json({ message : err.message });
    }
})

router.post('/', async ( req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    }
    catch(err) {
        res.status(500).json({ message : "The Book has not been added due to some problem. Please try again after some time..."});
    }
})

router.put('/:id', async( req, res ) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id , req.body, {new : true , runValidators : true});
        res.status(200).json(book);
    }
    catch(err) {
        res.status(404).json({ message : err.message });
    }
})

router.delete('/:id', async( req, res ) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if(!book) {
            return res.status(404).json({message : "The Book has already been deleted..."})
        }

        res.status(200).json({ message : "The Book has been deleted successfully"});
    } 
    catch ( err ) {
        res.status(500).json({ message : err.message })
    }
})

export default router;