const express = require('express');

const eventDataRouter = express.Router();
const { createEventDataCampaign, getEventDataCampaign, updateEventDataCampaign } = require('../controllers/eventDataController');

eventDataRouter.get('/', (req, res) => {
  console.log('event data home path!');
  res.send('Home! event /');
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

//create event data obj in event data collection
eventDataRouter.put('/insertData', (req, res) => {

  const { data, id } = req.body;

  updateEventDataCampaign(res, id, data);
  res.send('updated? aka inserted?');

});

module.exports = eventDataRouter;
