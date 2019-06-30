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
    }
});

const Movies = mongoose.model('Movies', MoviesSchema);

module.exports = Movies;