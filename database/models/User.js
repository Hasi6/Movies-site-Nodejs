const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
});

UsersSchema.pre('save', function(next){
    const user= this;

    bcrypt.hash(user.password, 10, function(err, encrypted){
        user.password = encrypted;
        next();
    });
});

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;