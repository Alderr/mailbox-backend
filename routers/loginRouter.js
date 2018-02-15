const express = require('express');

const loginRouter = express.Router();

const { findUser } = require('../controllers/userController');


loginRouter.post('/logIn', (req, res) => {

    const { user } = req.body;

    return findUser(user)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.send(err.message);
        });
});

module.exports = loginRouter;
