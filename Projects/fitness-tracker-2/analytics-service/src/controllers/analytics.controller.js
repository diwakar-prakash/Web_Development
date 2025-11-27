import Workout from "../models/Workout.js";
import connectRedis from "../config/redis.js";

const redis = connectRedis();
const TTL = Number(process.env.REDIS_TTL_SECONDS || 300); 

export const getSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cacheKey = `analytics:summary:${userId}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      const data = JSON.parse(cached);
      return res.json({
        fromCache: true,
        ...data,
      });
    }

    const workouts = await Workout.find({ userId });

    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = workouts.reduce(
      (sum, w) => sum + w.caloriesBurned,
      0
    );

    const workoutsPerDay = {};
    for (const w of workouts) {
      const day = w.date.toISOString().split("T")[0];
      if (!workoutsPerDay[day]) workoutsPerDay[day] = 0;
      workoutsPerDay[day] += 1;
    }

    const summary = {
      totalWorkouts,
      totalDuration,
      totalCalories,
      workoutsPerDay,
    };

    await redis.set(cacheKey, JSON.stringify(summary), "EX", TTL);

    return res.json({
      fromCache: false,
      ...summary,
    });
  } catch (err) {
    next(err);
  }
};
