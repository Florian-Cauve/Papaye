const express = require('express');
const router = express.Router();

const Exercise = require('../models/exercise.model');
const Training = require('../models/training.model')

// @route POST Create an exercise --> /exercises/
router.post('/', (req, res) => {
    Exercise.create(req.body)
        .then(exercise => Training.findByIdAndUpdate(exercise.training, { $push: { exercises: exercise.id }}))
        .then(_user => res.json({ msg: 'Exercise added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this exercise' }));
});

// @route DELETE Delete an exercise --> /exercises/:id
router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => Training.findByIdAndUpdate(exercise.training, { $pull: { exercises: exercise.id }}))
        .then(exercise => res.json({ mgs: 'Exercise entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a exercise' }));
});

module.exports = router;