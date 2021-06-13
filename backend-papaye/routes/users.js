const express = require('express');
const router = express.Router();
const passwordServices = require('../services/passwordServices')

const User = require('../models/user.model');
const Receipe = require('../models/receipe.model');
const Training = require('../models/training.model');
const Exercise = require('../models/exercise.model');
const Socialpost = require('../models/socialpost.model');


// @route GET all users --> /users/
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ Error: err, nousersfound: 'No Users found' }));
});

// @route GET user by Id --> /users/:id
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route PUT update an user --> /users/
router.put('/', (req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body)
    .then(user => res.json({ msg: 'Updated successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

// @route GET all receipes of a user --> users/:id/receipes
router.get('/:id/receipes', (req, res) => {
  User.findById(req.params.id).populate("receipes")
    .then(user => res.json(user.receipes))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET all posts of a user --> users/:id/socialposts
router.get('/:id/socialposts', (req, res) => {
  User.findById(req.params.id).populate("socialPosts")
    .then(user => res.json(user.socialPosts))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET all trainings of a user --> users/:id/trainings
router.get('/:id/trainings', (req, res) => {
  User.findById(req.params.id).populate("trainings")
    .then(user => res.json(user.trainings))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route DELETE a user --> /users/:id
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      user.trainings.map(training => Training.findByIdAndDelete(training)
          .then(training => {
            training.exercises.map(exercise => Exercise.findByIdAndDelete(exercise))
          }))
      user.receipes.map(receipe => Receipe.findByIdAndDelete(receipe))
    })
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

module.exports = router;