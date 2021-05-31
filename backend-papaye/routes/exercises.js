const express = require('express');
const router = express.Router();

const Exercise = require('../models/exercise.model');
const User = require('../models/user.model');

// @route GET /exercises/
router.get('/', (req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(404).json({ noexercisesfound: 'No exercises found' }));
});

// @route GET /exercises/:id
router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(404).json({ noexercisesfound: 'No exercises found' }));
});

// @route POST /exercises/
router.post('/', (req, res) => {
    Exercise.create(req.body)
        .then(exercise => User.findByIdAndUpdate(exercise.owner, { $push: { exercises: exercise.id }}))
        .then(_user => res.json({   user: _user, msg: 'Exercise added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this exercise' }));
});

// @route PUT /exercises/
router.put('/', (req, res) => {
    Exercise.findByIdAndUpdate(req.body.id, req.body)
        .then(exercise => res.json({ id: exercise.id, msg: 'Updated successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

// @route GET exercises/:id/users
router.get('/:id/users', (req, res) => {
    Exercise.findById(req.params.id).populate('owner')
      .then(exercise => res.json(exercise.owner))
      .catch(err => res.status(404).json({ noreceipesfound: 'No Receipe found' }));
});

// @route DELETE /exercises/:id
router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json({ id: exercise.id, mgs: 'Exercise entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a exercise' }));
});

module.exports = router;