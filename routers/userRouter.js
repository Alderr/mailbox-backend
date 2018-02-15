const express = require('express');

const userRouter = express.Router();

const { createUser, getUser } = require('../controllers/userController');
//get a user
userRouter.get('/:id', (req, res) => {

    const requiredParamsNames = ['id'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { id } = req.params;

    //getUser(id);
    
});

//gets all users
userRouter.get('/all', (req, res) => {

});

//create a user
userRouter.post('/create', (req, res) => {
    let requiredQueryNames = ['username', 'password', 'name'];

    for (let name in requiredQueryNames){
        if (!req.body[requiredQueryNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { username, password, name } = req.body;

    createUser({username, password, name});

    res.send('Request recieved. POST USER');

});

//update a user
userRouter.put('/update/:id', (req, res) => {
    let requiredParamsNames = ['coinName', 'id'];
    let requiredBodyNames = ['userAmount', 'previousValue', 'date'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    for (let name in requiredBodyNames){
        if (!req.body[requiredBodyNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { coinName, id } = req.params;
    let { userAmount, date, previousValue } = req.body;


});

//del a user
userRouter.delete('/delete/:id', (req, res) => {
    let requiredParamsNames = ['id'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { coinName, id } = req.params;


});

//delete all users NUKE
userRouter.delete('/delete/all', (req, res) => {

});


module.exports = userRouter;
