const mongoose = require('mongoose');

const MoviesSlideSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

const MoviesSlide = mongoose.model('Categories', MoviesSlideSchema);

module.exports = MoviesSlide;