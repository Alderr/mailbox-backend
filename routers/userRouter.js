const express = require('express');

let userRouter = express.Router();


const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');

//get a user
userRouter.get('/:id', (req, res) => {

    const requiredParamsNames = ['coinName', 'id'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { coinName, id } = req.params;

});

//gets all users
userRouter.get('/all', (req, res) => {

});

//create a user
userRouter.post('/create', (req, res) => {
    let requiredQueryNames = ['coinName', 'userAmount'];

    for (let name in requiredQueryNames){
        if (!req.body[requiredQueryNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { coinName, userAmount, date, previousValue } = req.body;

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
