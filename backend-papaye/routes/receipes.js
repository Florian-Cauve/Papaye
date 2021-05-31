const express = require('express');
const router = express.Router();

const Receipe = require('../models/receipe.model');
const User = require('../models/user.model');
// @route GET api/receipes/test
router.get('/test', (req, res) => res.send('receipe route testing!'));

// @route GET api/receipes/
router.get('/', (req, res) => {
    Receipe.find()
        .then(receipes => res.json(receipes))
        .catch(err => res.status(404).json({ Error: err, noreceipesfound: 'No receipes found' }));
});

// @route GET api/receipes/:id
router.get('/:id', (req, res) => {
    Receipe.findById(req.params.id)
        .then(receipe => res.json(receipe))
        .catch(err => res.status(404).json({ noreceipesfound: 'No receipes found' }));
});

// @route POST api/receipes
router.post('/:user_id', (req, res) => {
    Receipe.create(req.body)
        .then(receipe => receipe.owner = req.params.user_id)
        .then(receipe => User.findByIdAndUpdate(req.params.user_id, {$push: {receipes: receipe.id}}))
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: 'Unable to add this receipe' }));
});

// @route GET users/:id/receipes
router.get('/:id/users', (req, res) => {
    Receipe.findById(req.params.id).populate('owner')
      .then(receipe => res.json(receipe))
      .catch(err => res.status(404).json({ noreceipesfound: 'No Receipe found' }));
});

// @route PUT api/receipes/:id
router.put('/:id', (req, res) => {
    Receipe.findByIdAndUpdate(req.params.id, req.body)
        .then(receipe => res.json({ id: receipe.id, msg: 'Updated successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

// @route DELETE api/receipes/:id
router.delete('/:id', (req, res) => {
    Receipe.findByIdAndDelete(req.params.id)
        .then(receipe => res.json({ id: receipe.id, mgs: 'Receipe entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a receipe' }));
});

module.exports = router;