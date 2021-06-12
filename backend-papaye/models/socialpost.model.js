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
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
});

module.exports = Receipe = mongoose.model('Socialpost', SocialPostSchema);