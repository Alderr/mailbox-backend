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

    let { userId, id } = req.params;

});

//gets all campaigns
campaignRouter.get('/:userId', (req, res) => {

    let { userId } = req.params;

    getAllCampaigns(userId)
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.send(err.message);
        });

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

    return createCampaign({ name, email_content, lists }, userId)
        .then((data) => {
            res.send(data);
        });
});

//del a campaign
campaignRouter.delete('/:userId/delete/:id', (req, res) => {

    const { userId, id } = req.params;

    return deleteCampaign(userId, id)
        .then(data => {
            console.log(data);
            res.json(data);

        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });

});

//delete all campaigns NUKE
// campaignRouter.delete(':userId/delete/all', (req, res) => {
//
// });


module.exports = campaignRouter;
