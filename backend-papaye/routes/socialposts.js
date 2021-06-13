const express = require('express');
const router = express.Router();

const SocialPost = require('../models/socialpost.model');
const User = require('../models/user.model');

// @route GET all social posts --> /social/
router.get('/', (req, res) => {
    SocialPost.find({})
        .sort('-updatedAt')
        .then(socialposts => res.json(socialposts))
        .catch(err => res.status(404).json(err));
});

// @route GET post by Id --> /social/:id
router.get('/:id', (req, res) => {
    SocialPost.findById(req.params.id)
        .then(socialpost => res.json(socialpost))
        .catch(err => res.status(404).json({ nosocialpostfound: 'No socialpost found' }));
});

// @route POST Create a post --> /social/
router.post('/', (req, res) => {
    SocialPost.create(req.body)
        .then(socialpost => User.findByIdAndUpdate(socialpost.owner, { $push: { socialPosts: socialpost.id }}))
        .then(_user => res.json({   user: _user, msg: 'Social post added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this socialpost' }));
});

// @route PUT Update a post --> /social/
router.put('/', (req, res) => {
    SocialPost.findByIdAndUpdate(req.body.id, req.body)
        .then(socialpost => res.json({ id: socialpost.id, msg: 'Updated successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

// @route GET the user of the post --> /social/:id/users
router.get('/:id/users', (req, res) => {
    SocialPost.findById(req.params.id).populate('owner')
      .then(socialpost => res.json(socialpost.owner))
      .catch(err => res.status(404).json({ nosocialpostfound: 'No socialpost found' }));
});

// @route DELETE this post --> /social/:id
router.delete('/:id', (req, res) => {
    SocialPost.findByIdAndDelete(req.params.id)
        .then(socialpost => res.json({ id: socialpost.id, mgs: 'Socialpost entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such socialpost' }));
});
module.exports = router;