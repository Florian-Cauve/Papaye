const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
    program_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 20
    },
    description:{
        type: String,
        required: true,
        trim: true,
        minlength: 50
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