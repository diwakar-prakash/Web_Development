import authMiddle from "../middleware/auth.middleware.js";
import roleMiddle from "../middleware/role.middleware.js";
import { Router } from "express";

import { deleteClass, assignTeacher, createAClass, removeStudent, updateClass, addStudent, watchAParticularClass, watchAllClasses } from "../controllers/class.controller.js";

const router = Router();

// create a new class
router.post('/create', authMiddle, roleMiddle("admin", "teacher"), createAClass);

// see all the classes 
router.get('/getAll', watchAllClasses);

// see a class
router.get('/watchclass/:classId', watchAParticularClass);

// add a student in the class
router.post('/addStudent/:classId', authMiddle, roleMiddle("admin", "teacher"), addStudent);

// assign a techer into a class. this one was a little bit confusing.
router.post('/assignteacher/:classId', authMiddle, roleMiddle("admin"), assignTeacher);

// remove a student from the class
router.post('/deleteStudent/:classId', authMiddle, roleMiddle("admin", "teacher"), removeStudent);


// update the class
router.put('/updateclass/:classId', authMiddle, roleMiddle("admin"), updateClass);

// delete the class
router.delete('/deleteclass/:classId', authMiddle, roleMiddle("admin"), deleteClass);

export default router;