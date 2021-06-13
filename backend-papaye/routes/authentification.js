const express = require('express');
const router = express.Router();
const passwordServices = require('../services/passwordServices')

const User = require('../models/user.model');

// @route POST Create an User --> /users/register
router.post('/register', (req, res) => {
    data = req.body;
    data.password = passwordServices.hash(data.password);
    User.create(data)
        .then(user => res.json({ msg: 'User added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

// @route POST Login --> /users/login
router.post('/login', (req, res) => {
    passwordServices.authenticate(req.body)
        .then(user => {
            res.status(202).json({ id: user.id, msg: "User successfully logged in" })
        })
        .catch(err => res.status(202).json({ msg: "Incorrect" }))
})

module.exports = router;