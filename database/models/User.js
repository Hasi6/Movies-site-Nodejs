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



const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;