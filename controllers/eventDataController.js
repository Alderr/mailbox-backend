const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');


const createEventDataCampaign = (response, data) => {
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

const getAllEventDataCampaigns = (response) => {
  EventDataModel.find()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
}

const getEventDataCampaign = (response, id) => {
  EventDataModel.findById(id)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
}

const updateEventDataCampaign = (response, id, data) => {
  EventDataModel.findById(id)
    .then((data) => {
      if (data) {
        console.log(data);
        // data.campaigns = [...data.campaigns, campaign]
        // return data.save();
      }
      else {
        return response.send('Nope.');
      }
    })
    // .then(res => {
    //   console.log(res);
    //   return response.status(201).send('Added.');
    // })
    .catch((err) => {
      console.log(err);
    });
}

module.exports =
{
  createEventDataCampaign,
  getAllEventDataCampaigns,
  getEventDataCampaign,
  updateEventDataCampaign
};
