import express from "express";
import authMiddle from "../middleware/auth.middleware.js";

import { createWorkout, getWorkouts } from "../controllers/workout.controller.js"

const router = express.Router();

router.post("/workouts", authMiddle, createWorkout);

router.get('/workouts', authMiddle, getWorkouts);

export default router;