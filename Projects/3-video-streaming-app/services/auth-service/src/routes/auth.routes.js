import { Router } from "express";
import { logIn, signUp, verify } from "../controllers/auth.controller";

const router = Router();

router.post('/signup', signUp);

router.post('/login', logIn);

router.get('/verify', verify);

export default router;