import { Router } from "express";
import authMiddle from "../middleware/auth.proxy.js";
import { createVideoInfo, getAllVideo, getVideo, updateStatus, updateView } from "../controllers/video.controller.js";

const router = Router();

router.post('/videos', authMiddle, createVideoInfo);

router.get("/videos/:id", authMiddle, getVideo);

router.get('/videos', getAllVideo);

router.patch('/videos/:id/status', authMiddle, updateStatus);

router.patch('/videos/:id/views', updateView);


export default router;