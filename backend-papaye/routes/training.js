const express = require('express');
const router = express.Router();

const Training = require('../models/training.model');
const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');

// @route POST Create a training -> /trainings/
router.post('/', (req, res) => {
    Training.create(req.body)
        .then(training => User.findByIdAndUpdate(training.owner, {$push: {trainings: training.id}}))
        .then(_user => res.json({ msg: 'Training added successfully'  }))
        .catch(err => res.status(400).json({ error: 'Unable to add this training' }));
});

// @route GET a training by Id -> /trainings/:id
router.get('/:id', (req, res) => {
    Training.findById(req.params.id).populate('exercises')
        .then(training => res.json(training))
        .catch(err => res.status(404).json({ notrainingsfound: "No trainings found" }))
})

// @route PUT Update a training -> /trainings/
router.put('/', (req, res) => {
    Training.findByIdAndUpdate(req.body._id, req.body)
      .then(training => res.json({ msg: 'Updated successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
  });

// @route DELETE a training -> /training/:id
router.delete('/:id', (req, res) => {
    Training.findByIdAndDelete(req.params.id)
        .then(training => {
            User.findByIdAndUpdate(training.owner, {$pull: {trainings: training.id}})
            training.exercises.map(exercise => Exercise.findByIdAndDelete(exercise))
        })
        .then(training => res.json({ mgs: 'User entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a user' }));
});

module.exports = router;
 