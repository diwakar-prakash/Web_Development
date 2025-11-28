import { Router } from "express";

import { loginStuff, signupStuff } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signup', signupStuff);

router.post('/login', loginStuff);

export default router; 