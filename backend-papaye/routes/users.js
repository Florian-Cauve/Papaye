const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

// @route GET api/users/test
router.get('/test', (req, res) => res.send('user route testing!'));

// @route GET api/users/
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ Error: err, nousersfound: 'No Users found' }));
});

// @route GET api/users/:id
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET users/:id/receipes
router.get('/:id/receipes', (req, res) => {
  User.findById(req.params.id).populate("receipes")
    .then(user => res.json(user.receipes))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET users/:id/exercises
router.get('/:id/exercises', (req, res) => {
  User.findById(req.params.id).populate("exercises")
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route POST api/users // ✔️
router.post('/register', (req, res) => {
  User.create(req.body)
    .then(user => res.json({ id: user.id, msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

// @route PUT api/users/:id
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ id: user.id, msg: 'Updated successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

// @route DELETE api/users/:id
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json({ id: user.id, mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

module.exports = router;