const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    movieId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

const Comments = mongoose.model('Comments', CommentsSchema);
module.exports = Comments;