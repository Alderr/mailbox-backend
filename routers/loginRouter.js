const express = require('express');

const loginRouter = express.Router();

const { findUser } = require('../controllers/userController');


loginRouter.post('/signIn', (req, res) => {

    const { username, password } = req.body;

    return findUser(username, password)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err.message);
        });
});

module.exports = loginRouter;
