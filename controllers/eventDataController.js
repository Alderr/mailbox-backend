const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');


const createEventDataCampaign = () => {
  return EventDataModel.create({})
  .then(data => {
    console.log('I created the campaign?');
    console.log(data);
    console.log('-----------------------');
    return data;
  })
  .catch(err => {
    console.log(err);
  });
}

const getAllEventDataCampaigns = () => {
  EventDataModel.find()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
}

const getEventDataCampaign = (id) => {
  EventDataModel.findById(id)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
}

module.exports = { createEventDataCampaign, getAllEventDataCampaigns, getEventDataCampaign };
