import Workout from "../models/Workout.js";


export const createWorkout = async ( req , res , next ) => {
    try {
        const { type, duration, caloriesBurned, date } = req.body;

        if(!type || !duration || !caloriesBurned) {
            return res.status(401).json({
                message : "All the fields are required"
            })
        }

        const creatework = await Workout.create({
            userId : req.user.id,
            type,
            duration, 
            caloriesBurned,
            date: date || Date.now()
        })

        return res.status(201).json({
            message : "Workout has been created",
            type : creatework.type,
            duration : creatework.duration,
            caloriesBurned : creatework.caloriesBurned,
            date : creatework.date
        })
    }
    catch ( err ) {
        next(err);
    }
}

export const getWorkouts = async ( req , res , next ) => {
    try {
        const workouts = await Workout.find({ userId : req.user.id }).sort({ createdAt : -1 });

        res.json({
            message : "The following are all of your workouts",
            workouts
        })
    }
    catch ( error ) {
        next(error);
    }
}