const bcrypt = require('bcryptjs');
const randomString = require('randomstring');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const token = randomString.generate();

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
    },
    confirmed: {
        type: Boolean,
        default:false
    },
    userToken:{
        type: String,
        default: token
    }
});

UsersSchema.pre('save', (next)=>{
    const user= this;

    bcrypt.hash(user.password, 10, function(err, encrypted){
        user.password = encrypted;
        next();
    });
});


const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;