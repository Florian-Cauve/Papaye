const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
    programName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description:{
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    pathImage:{
        type: String
    }
}, {
    timestamps: true,
});

module.exports = Training = mongoose.model('Training', TrainingSchema);