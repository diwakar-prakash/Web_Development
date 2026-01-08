import { Router } from "express";
import passport from "../config/passport.js";
import { signup, login } from "../controllers/auth.controller.js";
const router = Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/google', passport.authenticate("google", { scope : ["email", "profile"]}));

router.get('/google/callback', passport.authenticate("goole", { session : false }), ( req , res ) => {
    const token = jwt.sign(
        { userId : req.user._id, role: req.user.role },
        process.env.JWT_SECRET,
        { expiresIn : "4h" }
    );
    res.status(201).json({
        token
    });
})

export default router;