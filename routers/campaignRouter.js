const express = require('express');

const campaignRouter = express.Router();

const { createCampaign } = require('../controllers/campaignController');

//get a campaign
campaignRouter.get('/:userId/:id', (req, res) => {

    const requiredParamsNames = ['userId','id'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { userId, id } = req.params;

});

//gets all campaigns
campaignRouter.get('/:userId/all', (req, res) => {

});

//create a campaign
campaignRouter.post('/:userId/create', (req, res) => {
    let requiredQueryNames = ['name', 'email_content', 'lists'];

    for (let name in requiredQueryNames){
        if (!req.body[requiredQueryNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { name, email_content, lists } = req.body;
    let { userId } = req.params;

    createCampaign({ name, email_content, lists }, userId);

    res.send('Request recieved. POST campaign');

});

//update a campaign
campaignRouter.put('/update/:id', (req, res) => {
    let requiredParamsNames = ['coinName', 'id'];
    let requiredBodyNames = ['campaignAmount', 'previousValue', 'date'];

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
    let { campaignAmount, date, previousValue } = req.body;


});

//del a campaign
campaignRouter.delete('/delete/:id', (req, res) => {
    let requiredParamsNames = ['id'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    let { coinName, id } = req.params;


});

//delete all campaigns NUKE
campaignRouter.delete('/delete/all', (req, res) => {

});


module.exports = campaignRouter;
