import { Router } from "express";
import { getMessages, postMessage } from "../controllers/dm.controller.js";

const router = Router();

router.get('/:senderId/:userId', getMessages );
router.post('/:userId', postMessage);

export default router;