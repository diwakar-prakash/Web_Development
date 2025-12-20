import { Router } from "express";
import authMiddle from "../middlewares/auth.proxy.js";
import upload from "../middlewares/upload.middleware.js";
import { uploadVideo } from "../controllers/upload.controller.js";

const router = Router();

router.post(
  "/:videoId",
  authMiddle,
  upload.single("video"),
  uploadVideo
);

export default router;
