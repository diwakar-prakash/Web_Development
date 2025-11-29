import Watchlist from "../models/Watchlist.js";

// the following are the routes that we are going to make
// add to watchlist
// remove from watchlist
// mark as watched
// mark favourite
// get full watchlist


export const addToWatchlist = async ( req , res ) => {
    try {
        const movieId = req.params.movieId;

        if(!movieId) {
            return res.status(401).json({
                message : "Movie not selected for the watchlist"
            })
        }

        const findIfMovieIsAlreadyInWatchlist = await Watchlist.findOne({
            userId : req.user.id,
            movieId : movieId
        })

        if(findIfMovieIsAlreadyInWatchlist) {
            return res.status(400).json({
                message : "Movie already exists in watchlist"
            })
        }

        const exertInWatchlist = await Watchlist.create({
            userId : req.user.id,
            movieId : movieId
        })

        res.status(201).json({
            message : "Added to the Watchlist",
            userId : exertInWatchlist.userId,
            movieId : exertInWatchlist.movieId
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Error came in adding movie to the watchlist",
            error : err.message
        })
    }
}

// now ham banayenge remove from watchlist

export const removeFromWatchlist = async ( req , res ) => {
    try {
        const movieId = req.params.movieId;
        
        if ( !movieId ) {
            return res.status(401).json({
                message : "Movie Required, Kuch bhi thodi na delete kardenge bhai"
            })
        }

        const removeMovieFromWatchlist = await Watchlist.findOneAndDelete({
            userId : req.user.id,
            movieId : movieId
        })
        res.status(201).json({
            message : "Movie Deleted Successfully from the Watchlist"
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error came while deleting the movie from the watchlist"
        })
    }
}


// now we are going to make a route for mark as watched 

export const markAsWatched = async ( req, res ) => {
    try {
        const movieId = req.params.movieId;

        if(!movieId) {
            return res.status(401).json({
                message : "Movie required"
            })
        }

        const ifMovieExistsInWatchlist = await Watchlist.findOne({
            userId : req.user.id,
            movieId : movieId
        })

        if(!ifMovieExistsInWatchlist) {
            return res.status(401).json({
                message : "Movie is not present in Watchlist"
            })
        }

        const updateAsWatched = await Watchlist.findOneAndUpdate(
            {
                userId : req.user.id,
                movieId : movieId
            },
            {
                status : "watched"
            },
            {
                new : true,
                runValidators : true
            }
        )

        res.status(201).json({
            message : "Movie has been marked as watched"
        })
    }
    catch (err) {
        res.status(404).json({
            message : " Error came while updating as Watched ",
            error : err.message
        })
    }
}


// here we are going to create the function for marking the favourite 

export const markAsFavourite = async ( req , res ) => {
    try {
        const movieId = req.params.movieId;

        if(!movieId) {
            return res.status(401).json({
                message : "Movie Required"
            })
        }

        const findCurrentMarked = await Watchlist.findOne({ userId : req.user.id, movieId : movieId });

        if(!findCurrentMarked) {
            return res.status(401).json({
                message : "Movie not found in the watchlist"
            })
        }

        findCurrentMarked.favourite = !findCurrentMarked.favourite;

        await findCurrentMarked.save();

        res.status(201).json({
            message : "Favourite Status Updated"
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Error while Updating the favourite status",
            error : err.message
        })
    }
}

// get all the watchlist movies 

export const allWatchlistMovies = async ( req, res ) => {
    try {
        const findAllMovies = await Watchlist.find({ userId : req.user.id });

        res.status(200).json({
            message : "The following are all the movies in the watchlist ",
            movies : findAllMovies
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Error finding all your watchlist movies"
        })
    }
}