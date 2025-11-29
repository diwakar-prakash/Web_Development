import mongoose from "mongoose" 

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    genre : {
        type : String,
        required : true
    },
    releaseYear : {
        type : Number
    },
    poster : {
        type : String
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId
    }
},
{ timestamps : true }
)

export default mongoose.model("movies_in_movie-watchlist-2", movieSchema);
