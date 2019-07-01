const mongoose = require('mongoose');

const MoviesSlideSchema = new mongoose.Schema({
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
    image: String,
    createdDate:{
        type: Date,
        default: new Date()
    }
});

const MoviesSlide = mongoose.model('MoviesSlide', MoviesSlideSchema);

module.exports = MoviesSlide;