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
    imageURL: {
        type: String
    },
    receipes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Receipe"
        }   
    ],
    trainings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Training"
        }
    ],
    socialPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: "SocialPost"
        }   
    ],
}, {
    timestamps: true,
});

module.exports = User = mongoose.model('User', UserSchema);