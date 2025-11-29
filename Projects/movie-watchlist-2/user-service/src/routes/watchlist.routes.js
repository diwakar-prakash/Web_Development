import { Router } from "express";
import authMiddle from "../middleware/auth.middleware.js";

import { addToWatchlist, removeFromWatchlist, markAsFavourite, markAsWatched, allWatchlistMovies } from "../controllers/watchlist.controller"; 

const router = Router();

router.post('/add/:movieId', authMiddle, addToWatchlist);

router.put('/watched/:movieId', authMiddle, markAsWatched);

router.put('/favourite/:movieId', authMiddle, markAsFavourite);

router.get('/', authMiddle, allWatchlistMovies);

router.delete('/delete/:movieId', authMiddle, removeFromWatchlist);

export default router;