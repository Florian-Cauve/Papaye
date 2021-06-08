const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    ingredients: [{
        name: { type: String },
        quantity: { type: String }
    }],
    imageURL: {
        type: String
    } 
}, {
    timestamps: true,
});

module.exports = Receipe = mongoose.model('Receipe', ReceipeSchema);