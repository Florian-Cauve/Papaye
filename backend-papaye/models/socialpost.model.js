const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialPostSchema = new Schema({
    pseudo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
});

module.exports = Receipe = mongoose.model('SocialPost', SocialPostSchema);