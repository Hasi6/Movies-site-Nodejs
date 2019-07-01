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
    country: String,
    category: String,
    image: String,
    createdDate:{
        type: Date,
        default: new Date()
    }
});

const Movies = mongoose.model('Movies', MoviesSchema);

module.exports = Movies;