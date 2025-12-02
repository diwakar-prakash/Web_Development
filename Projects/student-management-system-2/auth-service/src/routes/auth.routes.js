import { Router } from "express";

const router = Router();

import { loginThing, signupThing } from "../controllers/auth.controller.js"


router.post('/signup', signupThing);

router.post('/login', loginThing);


export default router;