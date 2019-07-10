const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    movieName:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    idbmRating:{
        type: Number,
        required: true
    },
    createDate:{
        type: Date,
        default: Date.now
    }
});

const News = mongoose.model('News', NewsSchema);
module.exports = News;