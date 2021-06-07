const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    training:{
        type: Schema.Types.ObjectId,
        ref: "Training"
    }
}, {
    timestamps: true,
});

module.exports = Exercise = mongoose.model('Exercise', ExerciseSchema);