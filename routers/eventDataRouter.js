const express = require('express');

const eventDataRouter = express.Router();
const {  } = require('../controllers/eventDataController');

eventDataRouter.get('/', (req, res) => {
  console.log('event data home path!');
  res.send('Home! event /');
});



module.exports = eventDataRouter;
