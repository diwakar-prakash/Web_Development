import authMiddle from "../middleware/auth.middleware.js";
import checkRole from "../middleware/role.middleware.js";
import { Router } from "express";
import upload from "../middleware/upload.middleware.js";

import { deleteStudent, changeStudent, getStudents, postStudent } from "../controllers/student.controller.js";

const router = Router();

router.post('/create', authMiddle, checkRole("admin", "teacher"), upload.single("photo"), postStudent);

router.put('/change/:id', authMiddle, checkRole("admin", "teacher"), upload.single("photo"), changeStudent);

router.get('/all', getStudents);

router.delete('/delete/:id', authMiddle, checkRole("admin"), deleteStudent);

export default router;