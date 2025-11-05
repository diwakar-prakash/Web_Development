import express from "express";
import Category from "../models/Category.js";
import Note from "../models/Note.js";


const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Note.deleteMany({ category: req.params.id });

    res.status(200).json({ message: "Category and its notes deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
