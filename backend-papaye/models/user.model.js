const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    height:{
        type: Number
    },
    weight:{
        type: Number
    },
    receipes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Receipe"
        }   
    ],
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ]
}, {
    timestamps: true,
});

module.exports = User = mongoose.model('User', UserSchema);