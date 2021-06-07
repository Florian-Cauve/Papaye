const express = require('express');
const router = express.Router();
const passwordServices = require('../services/passwordServices')

const User = require('../models/user.model');

// @route GET /users/
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ Error: err, nousersfound: 'No Users found' }));
});

// @route GET /users/:id
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route POST /users/register
router.post('/register', (req, res) => {
  data = req.body;
  console.log(data);
  data.password = passwordServices.hash(data.password);
  User.create(data)
    .then(user => res.json({ id: user.id, msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

// @route POST /users/login
router.post('/login', (req, res) => {
  console.log(req)
  passwordServices.authenticate(req.body)
    .then(user => {
      if(user === {}){
        res.status(401)
      }else{
        res.status(202).json(user)
      }
    })
    .catch(err => console.log(err))
})

// @route PUT /users/
router.put('/', (req, res) => {
  User.findByIdAndUpdate(req.body.id, req.body)
    .then(user => res.json({ id: user.id, msg: 'Updated successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
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
    .then(user => res.json(user.exercises))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route DELETE /users/:id
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json({ id: user.id, mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

module.exports = router;