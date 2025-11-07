import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const con = await Contact.find();
    res.status(200).json(con);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const con = await Contact.create(req.body);
    res.status(201).json(con);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const up = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ message: "The update has been done for the Contact" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const del = await Contact.findByIdAndDelete(req.params.id);

    if (!del) {
      res.status(404).json({ message: "The contact has already been deleted" });
    }

    res.status(200).json("The Contact has been deleted.");
  } catch (err) {
    res.status(404).json({message : err.message});
  }
});

export default router;
