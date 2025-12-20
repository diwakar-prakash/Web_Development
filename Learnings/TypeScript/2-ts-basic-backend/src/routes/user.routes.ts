import { Router } from "express";
import { getUser, postUser } from "../controllers/user.controller";
const router = Router();

router.get('/user', getUser);
router.post('/user', postUser);

export default router;