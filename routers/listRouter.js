const express = require('express');

const {

    createList,
    getList,
    getAllLists

} = require('../controllers/listController');

const listRouter = express.Router();

//get a list
listRouter.get('/:userId/:id', (req, res) => {

    const requiredParamsNames = ['userId','id'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { userId, id } = req.params;

});

//gets all lists
listRouter.get('/:userId', (req, res) => {

    let { userId } = req.params;

    getAllLists(res, userId);

});

//create a list
listRouter.post('/:userId/create', (req, res) => {
    // let requiredQueryNames = ['name', 'contacts'];
    //
    // for (let name in requiredQueryNames){
    //     if (!req.body[requiredQueryNames[name]]) {
    //         return res.status(404).send('Missing query.');
    //     }
    // }


    let { name, contacts } = req.body;
    let { userId } = req.params;
    console.log('got here!');
    console.log('USERID', userId)

    createList(res, { name , contacts }, userId);

});

//update a list
listRouter.put('/:userId/update/:id', (req, res) => {
    let requiredParamsNames = ['coinName', 'id'];
    let requiredBodyNames = ['listAmount', 'previousValue', 'date'];

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
    let { listAmount, date, previousValue } = req.body;


});

//del a list
listRouter.delete(':userId/delete/:id', (req, res) => {
    let requiredParamsNames = ['id'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { coinName, id } = req.params;


});

//delete all lists NUKE
listRouter.delete(':userId/delete', (req, res) => {

});


module.exports = listRouter;
