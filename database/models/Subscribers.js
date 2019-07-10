const mongoose = require('mongoose');

const SubsSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true,
        unique: true
    }
});

const Subs = mongoose.model('Subs', SubsSchema);
module.exports = Subs;