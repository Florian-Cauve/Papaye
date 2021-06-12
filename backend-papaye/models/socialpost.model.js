const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialPostSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    link:{
        type: Schema.Types.ObjectId,
        required: false,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
});

module.exports = Receipe = mongoose.model('SocialPost', SocialPostSchema);