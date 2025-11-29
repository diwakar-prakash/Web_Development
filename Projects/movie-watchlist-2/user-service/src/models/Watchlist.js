import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    movieId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        enum : ['not-watched', 'watched'],
        default : "not-watched",
        required : true
    },
    favourite : {
        type : Boolean,
        default : false
    }
},
{ timestamps : true }
)

export default mongoose.model("watchlist_in_movie-watchlist-2", watchlistSchema);