import authMiddle from "../middleware/auth.middleware.js";
import adminMiddle from "../middleware/admin.middleware.js";
import { Router } from "express";
import upload from "../utils/upload.js";

import { postMovie, updateMovie, getMovie, deleteMovie } from "../controllers/movie.controller.js";

const router = Router();

router.post('/add', authMiddle, adminMiddle, upload.single("poster"), postMovie);

router.put('/update/:id', authMiddle, adminMiddle, updateMovie);

router.delete('/delete/:id', authMiddle, adminMiddle, deleteMovie);

router.get('/', authMiddle, getMovie);

export default router;