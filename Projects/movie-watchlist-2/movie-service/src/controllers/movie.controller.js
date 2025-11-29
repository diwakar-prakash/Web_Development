import Movie from "../models/Movie.js";


export const postMovie = async ( req , res , next ) => {
    try {
        const { title , description , genre , releaseYear } = req.body;

        const createMovie = await Movie.create({
            title : title,
            description : description,
            genre : genre,
            releaseYear : releaseYear,
            poster : req.file ? req.file.path : null,
            createdBy : req.user.id
        })

        res.status(201).json({
            message : "Movie Info Created",
            title : createMovie.title,
            description : createMovie.description,
            genre : createMovie.genre,
            releaseYear: createMovie.releaseYear,
            poster : createMovie.poster
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Some error came"
        })
    }
}

export const getMovie = async ( req, res, next ) => {
    try {
        const getMovies = await Movie.find();

        res.status(200).json({
            message : "The following are all the Movies",
            movies : getMovies
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Faised some error whle fetching movie data"
        })
    }
}


export const updateMovie = async( req, res, next ) => {
    try {
        const updateData = {
            ...req.body
        };

        if(req.file) {
            updateData.poster = req.file.path;
        }

        const updateMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new : true,
                runValidators : true
            }
        )
        res.status(201).json({
            message : "Movie updated",
            updateMovie
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Some error came while updating the movie"
        })
    }
}


export const deleteMovie = async(req, res, next) => {
    try {
        const delMovie = await Movie.findByIdAndDelete(req.params.id);
        
        res.status(201).json({
            message : "The movie has been deleted from the database"
        })
    }
    catch (err) {
        res.status(404).json({
            message : "Some error came while deleting the Movie"
        })
    }
}