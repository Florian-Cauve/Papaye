const express = require('training');
const router = express.Router();

const Training = require('../models/training.model');

// @route GET /trainings/
router.get('/', (req, res) => {
    Training.find()
        .then(trainings => res.json(trainings))
        .catch(err => res.status(404).json({Error: err, notrainingsfound: "No trainings found"}))
})

// @route GET /trainings/:id
router.get('/:id', (req, res) => {
    Training.findById(req.params.id)
        .then(training => res.json(training))
        .catch(err => res.status(404).json({ notrainingsfound: "No trainings found" }))
})