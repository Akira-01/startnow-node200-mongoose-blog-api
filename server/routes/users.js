const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});


router.get('/:id', (req, res) => {
    const userId = req.params.id;

    User
        .findById(userId)
        .then(user => {
            if (user == null) res.status(404).send('Bad ID');
            res.status(200).json(user);
        })
        .catch(err => res.status(404).send('Bad ID'));
});


// router.post('/', (req, res) => {
//     const newUser = new User(req.body);

//     User
//         .find()
//         .then(users => {
//             res.status(200).json(users);
//         });
// });


router.post('/', (req, res) => {
    var newUser = new User(req.body)
    newUser.save()
    .then(item => {
        res.status(201).json(item)
    })
    .catch(err => {
        res.status(404).send(err)
    })
});















router.put('/:id', (req, res) => {
    const userId = req.params.id;

    User
        .findByIdAndUpdate(userId, req.body)
        .then(user => {
            res.status(204).json(user);
        });
});





router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    User
        .findByIdAndRemove(userId)
        .then(user => {
            res.status(200).json(user);
        });
});


module.exports = router;
