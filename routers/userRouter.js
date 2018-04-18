const express = require('express');

const userRouter = express.Router();

const { createUser, getUser, getAllUsers, getUserSummaryData } = require('../controllers/userController');

//gets all users
userRouter.get('/all', (req, res) => {
    return getAllUsers()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.send(err.message);
        });
});

//get a user
userRouter.get('/:id', (req, res) => {

    const requiredParamsNames = ['id'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { id } = req.params;

    return getUser(id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.send(err.message);
        });

});

//user summary data - dashboard
userRouter.get('/:id/summary', (req, res) => {

    const { id } = req.params;

    getUserSummaryData(id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.send(err.message);
        });
});

//create a user
userRouter.post('/create', (req, res) => {
    let requiredQueryNames = ['username', 'password', 'name'];

    for (let name in requiredQueryNames){
        if (!req.body[requiredQueryNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    const { username, password, name } = req.body;

    const usernameIsNotTrimmed = username !== username.trim();
    const passwordIsNotTrimmed = password !== password.trim();
  
    if (usernameIsNotTrimmed || passwordIsNotTrimmed) {
        return res.status(422).send('No spaces before or after');
    }

    // Bcrypt truncates after 72 character
    let wrongPasswordSize = password.length <= 5 || password.length >= 72;
    let wrongUsernameSize = username.length <= 3 || username.length >= 20;

    if (wrongUsernameSize || wrongPasswordSize) {
        return res.status(422).send('Password must be between 5-72 characters. Username must be between 3-20 characters');
    }

    return createUser({username, password, name})
        .then((response) => res.send(response))
        .catch((err) => {
            res.send(err.message);
        });

});

//update a user
userRouter.put('/update/:id', (req, res) => {
    res.send('Hit /update/:id');

});

//del a user
userRouter.delete('/delete/:id', (req, res) => {
    res.send('Hit /delete/:id');
});

//delete all users NUKE
userRouter.delete('/delete/all', (req, res) => {
    res.send('Hit /delete/all');
});


module.exports = userRouter;
