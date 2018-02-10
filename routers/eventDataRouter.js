const express = require('express');

const eventDataRouter = express.Router();
const { createEventDataCampaign } = require('../controllers/eventDataController');

eventDataRouter.get('/', (req, res) => {
  console.log('event data home path!');
  res.send('Home! event /');
});

//get specific event data obj
eventDataRouter.get('/:id', (req, res) => {
  console.log('event data home path!');
  res.send('Home! event /');
});

//create event data obj in event data collection
eventDataRouter.post('/create', (req, res) => {

})

module.exports = eventDataRouter;
