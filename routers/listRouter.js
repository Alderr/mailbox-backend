const express = require('express');

const {

    createList,
    getList,
    getAllLists,
    updateList

} = require('../controllers/listController');

const listRouter = express.Router();

//get a list
listRouter.get('/:userId/:listId', (req, res) => {

    const requiredParamsNames = ['userId','listId'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { userId, listId } = req.params;

    getList(res, listId, userId);

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
listRouter.put('/:userId/update/:listId', (req, res) => {

    let { userId, listId } = req.params;
    let { name } = req.body;

    updateList(res, listId, name, userId);
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
