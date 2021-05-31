const express = require('express');
const router = express.Router();

const Receipe = require('../models/receipe.model');
const User = require('../models/user.model');

// @route GET /receipes/
router.get('/', (req, res) => {
    Receipe.find()
        .then(receipes => res.json(receipes))
        .catch(err => res.status(404).json({ noreceipesfound: 'No receipes found' }));
});

// @route GET /receipes/:id
router.get('/:id', (req, res) => {
    Receipe.findById(req.params.id)
        .then(receipe => res.json(receipe))
        .catch(err => res.status(404).json({ noreceipesfound: 'No receipes found' }));
});

// @route POST /receipes
router.post('/', (req, res) => {
    Receipe.create(req.body)
        .then(receipe => User.findByIdAndUpdate(receipe.owner, {$push: {receipes: receipe.id}}))
        .then(_user => res.json({   user: _user, msg: 'Receipe added successfully'  }))
        .catch(err => res.status(400).json({ error: 'Unable to add this receipe' }));
});

// @route PUT /receipes/
router.put('/', (req, res) => {
    Receipe.findByIdAndUpdate(req.body.id, req.body)
        .then(receipe => res.json({ id: receipe.id, msg: 'Updated successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

// @route GET receipes/:id/users
router.get('/:id/users', (req, res) => {
    Receipe.findById(req.params.id).populate('owner')
      .then(receipe => res.json(receipe.owner))
      .catch(err => res.status(404).json({ noreceipesfound: 'No Receipe found' }));
});

// @route DELETE /receipes/:id
router.delete('/:id', (req, res) => {
    Receipe.findByIdAndDelete(req.params.id)
        .then(receipe => res.json({ id: receipe.id, mgs: 'Receipe entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a receipe' }));
});

module.exports = router;