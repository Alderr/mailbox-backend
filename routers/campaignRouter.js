const express = require('express');

const campaignRouter = express.Router();

const { createCampaign, getAllCampaigns, deleteCampaign } = require('../controllers/campaignController');

//get a campaign
campaignRouter.get('/:userId/:id', (req, res) => {

    const requiredParamsNames = ['userId','id'];

    for (let name in requiredParamsNames){
        if (!req.params[requiredParamsNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    // const { userId, id } = req.params;

    // not done
    return res.json('/campaign');
});

//gets all campaigns
campaignRouter.get('/:userId', (req, res) => {

    const { userId } = req.params;

    getAllCampaigns(userId)
        .then(data => res.json(data))
        .catch(err => res.send(err.message));
});

//create a campaign
campaignRouter.post('/:userId/create', (req, res) => {
    const requiredQueryNames = ['name', 'email_content', 'lists'];

    for (let name in requiredQueryNames){
        if (!req.body[requiredQueryNames[name]]) {
            return res.status(404).send('Missing query.');
        }
    }

    const { name, email_content, lists } = req.body;
    const { userId } = req.params;

    return createCampaign({ name, email_content, lists }, userId)
        .then(data => res.send(data))
        .catch(err => res.send(err.message));
});

//del a campaign
campaignRouter.delete('/:userId/delete/:id', (req, res) => {

    const { userId, id } = req.params;

    return deleteCampaign(userId, id)
        .then(data => res.json(data))
        .catch(err => res.send(err.message));
});

module.exports = campaignRouter;
