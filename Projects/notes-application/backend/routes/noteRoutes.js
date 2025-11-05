import express from "express";
import Note from "../models/Note.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().populate("category", "name");
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const hatao = await Note.findByIdAndDelete(req.params.id);
    if(!hatao) {
        return res.status(404).json({ message : "Bhai ya to delete ho gaya hai, ya to nahi hai"})
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
