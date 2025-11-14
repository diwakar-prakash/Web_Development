import express from 'express';
import Transaction from '../models/Transaction.js';
import authMiddle from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// post a transaction 

router.post('/add', authMiddle, upload.single('receipt'), async ( req , res ) => {
    try {
        const { title, amount, type, category } = req.body;

        const receiptPath = req.file ? req.file.path : null;

        const newTransaction = await Transaction.create({
            title,
            amount,
            type,
            category,
            receipt : receiptPath,
            user : req.user.id
        });

        res.status(201).json({ message: "Transaction added", transaction: newTransaction });
    } 
    catch (err) {
        res.status(500).json({ message: "Failed to add transaction" });
  
    }
})


// get all the transaction, jo bhi hue hai

router.get('/', authMiddle, async ( req , res ) => {
    try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }

})



router.get("/summary", authMiddle, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

    res.status(200).json({ income, expense, balance: income - expense });
  } catch (err) {
    res.status(500).json({ message: "Error fetching summary" });
  }
});

export default router;

