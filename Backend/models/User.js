const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    height:{
        type: Number
    },
    weight:{
        type: Number
    },
});

module.exports = User = mongoose.model('user', UserSchema);