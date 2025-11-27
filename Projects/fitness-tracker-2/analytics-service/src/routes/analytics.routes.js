import { Router } from "express";

import authMiddle from "../middleware/auth.middleware.js";

import { getSummary } from "../controllers/analytics.controller.js";

const router = Router();

router.get('/summary', authMiddle, getSummary);

export default router;