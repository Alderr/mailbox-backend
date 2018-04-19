const express = require('express');

const {

    createList,
    getList,
    getAllLists,
    updateList,
    deleteList

} = require('../controllers/listController');

const {

    addContact,
    deleteContact

} = require('../controllers/contactController');

const listRouter = express.Router();

//get a list
listRouter.get('/:userId/:listId', (req, res) => {

    const requiredParamsNames = ['userId','listId'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    const { userId, listId } = req.params;

    getList(listId, userId)
        .then(data => res.json(data))
        .catch(err => res.send(err.message));
});

//gets all lists
listRouter.get('/:userId', (req, res) => {

    const { userId } = req.params;

    getAllLists(userId)
        .then(data => res.send(data))
        .catch(err => res.send(err));

});

//create a list
listRouter.post('/:userId/create', (req, res) => {
    // const requiredQueryNames = ['name', 'contacts'];
    //
    // for (let name in requiredQueryNames){
    //     if (!req.body[requiredQueryNames[name]]) {
    //         return res.status(404).send('Missing query.');
    //     }
    // }


    let { name, contacts } = req.body;
    let { userId } = req.params;

    createList(res, { name , contacts }, userId);

});

//update a list name
listRouter.put('/:userId/update/:listId', (req, res) => {

    let { userId, listId } = req.params;
    let { name } = req.body;

    updateList(listId, name, userId)
        .then(data => res.json(data))
        .catch(err => res.json(err.message));
});

//update a list
listRouter.put('/:userId/update/:listId/createContact', (req, res) => {

    const { userId, listId } = req.params;
    const  data = req.body;
    return addContact(listId, data, userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

//update a list; delete
listRouter.put('/:userId/update/:listId/deleteContact', (req, res) => {

    const { userId, listId } = req.params;

    const  { contactId } = req.body;

    return deleteContact(listId, contactId, userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });

});

//del a list
listRouter.delete('/:userId/delete/:id', (req, res) => {
    const requiredParamsNames = ['id', 'userId'];
    
    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    const { userId, id } = req.params;

    return deleteList(id, userId)
        .then(data => res.json(data))
        .catch(err => res.send(err.message));
});

//delete all lists NUKE
listRouter.delete(':userId/delete', (req, res) => {
    return res.send('/Nuke');
});



module.exports = listRouter;
