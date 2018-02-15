const express = require('express');

const userRouter = express.Router();

const { createUser, getUser, getAllUsers } = require('../controllers/userController');

//gets all users
userRouter.get('/all', (req, res) => {
    console.log('all users!');
    return getAllUsers()
        .then(data => {
            console.log('all users came back');
            res.json(data);
        })
        .catch(err => {
            console.log('err!');
            res.send(err);
        });
});

//user summary data - dashboard
userRouter.get('/summary', (req, res) => {
    res.json({
        totalContacts: 1230,
        totalEmails: 123,
        clicks: 123,
        recentCampaigns: [
            {
                'date': 1518572043706,
                'lists': [
                    {
                        '_id': '5a83b55af6457c2e70852fb6',
                        'id': '5a838c086313a838588e45c8'
                    }
                ],
                'email_content': {
                    'subject': 'Cheap stuffzz!?!',
                    'body': 'Dont buy buy buy. I\'ll lose a lot of money lol <a href=\'google.com\'> test me!</a>',
                    'sender': 'vernonmensah@gmail.com'
                },
                '_id': '5a83b55af6457c2e70852fb5',
                'name': '50% off',
                'campaign_event_data_id': '5a83b55af6457c2e70852fb4'
            },
            {
                'date': 1518617240602,
                'lists': [
                    {
                        '_id': '5a8458a3a82b5a0e189c5ffc',
                        'id': '5a838c086313a838588e45c8'
                    }
                ],
                'email_content': {
                    'subject': 'Hey! From Thinkful',
                    'body': 'Welcome. You\'re gonna google alot. <a href=\'google.com\'> try it lol!</a>',
                    'sender': 'vernonmensah@gmail.com'
                },
                '_id': '5a8458a3a82b5a0e189c5ffb',
                'name': 'Thinkful Welcome',
                'campaign_event_data_id': '5a8458a3a82b5a0e189c5ffa'
            }
        ]
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
            console.log('all users came back');
            res.json(data);
        })
        .catch(err => {
            console.log('err!');
            res.send(err);
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
