const express = require('express');
const router = express.Router();

const Exercise = require('../models/exercise.model');

// @route GET api/exercises/test
router.get('/test', (req, res) => res.send('Exercise route testing!'));

// @route GET api/exercises/
router.get('/', (req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(404).json({ Error: err, noexercisesfound: 'No exercises found' }));
});

// @route GET api/exercises/:id
router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(404).json({ noexercisesfound: 'No exercises found' }));
});

// @route POST api/exercises // 
router.post('/:user_id', (req, res) => {
    Exercise.create(req.body)
        .then(exercise => User.findByIdAndUpdate(req.params.user_id, { $push: { exercises: exercise.id }}))
        .then(user => res.json(exercise, user))
        .catch(err => res.status(400).json({ error: 'Unable to add this exercise' }));
});

// @route PUT api/exercises/:id
router.put('/:id', (req, res) => {
    Exercise.findByIdAndUpdate(req.params.id, req.body)
        .then(exercise => res.json({ id: exercise.id, msg: 'Updated successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

// @route DELETE api/exercises/:id
router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json({ id: exercise.id, mgs: 'Exercise entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a exercise' }));
});

module.exports = router;