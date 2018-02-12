const express = require('express');

const eventDataRouter = express.Router();
const {
    createEventDataCampaign,
    getEventDataCampaign,
    updateEventDataCampaign,
    getAllEventDataCampaigns
} = require('../controllers/eventDataController');

//get all event data objects
eventDataRouter.get('/', (req, res) => {
    getAllEventDataCampaigns(res);
});

//get specific event data obj
eventDataRouter.get('/:id', (req, res) => {
    console.log('event data home path!');

    const { id } = res.params;


    getEventDataCampaign(res, id);

    res.send('Home! event /');
});

//create event data obj in event data collection
eventDataRouter.post('/create', (req, res) => {

    createEventDataCampaign();
    res.send('created?');

});

//insert data into event data obj
eventDataRouter.put('/insertData', (req, res) => {

    const { data, campaign_event_id } = req.body;

    updateEventDataCampaign(res, campaign_event_id, data);
    res.send('updated? aka inserted?');

});

//delete specific campaign
eventDataRouter.del('/delete', (req, res) => {

    const { campaign_event_id } = req.body;

    updateEventDataCampaign(res, campaign_event_id);
    res.send('updated? aka inserted?');

});



module.exports = eventDataRouter;
