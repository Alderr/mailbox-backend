const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');


const createEventDataCampaign = () => {
  EventDataModel.create()
  .then(data => {
    console.log(data);
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
