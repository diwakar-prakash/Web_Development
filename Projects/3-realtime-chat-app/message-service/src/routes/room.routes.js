import { Router } from "express";
import { getMessages, postMessage } from "../controllers/room.controller.js";

const router = Router();

router.get('/:room', getMessages);
router.post('/:room', postMessage);

export default router;
