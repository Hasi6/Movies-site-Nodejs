const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    year:{
        type: Date,
        required: true
    },
    trailerLink:{
        type: String,
        required: true
    },
    downloadLink:{
        type: String,
        required: true
    },
    idbmRating: String,
    country: {
        type: [String]
    },
    category: {
        type: [String]
    },
    smallimage: String,
    largeimage: String,
    createdDate:{
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    }
});

const Movies = mongoose.model('Movies', MoviesSchema);
module.exports = Movies;