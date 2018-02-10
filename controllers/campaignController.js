const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');

const createCampaign = (response, campaign, userId) => {
  console.log(userId);
  console.log(campaign);

  UserModel.findById(userId)
    .then((data) => {
      if (data) {
        console.log(data.campaigns);
        data.campaigns = [...data.campaigns, campaign]
        return data.save();
      }

      response.send('Nope.');
    })
    .then(res => {
      console.log(res);
      response.status(201).send('Added.');
    })
    .catch((err) => {
      console.log(err);
    });
}

const getAllCampaigns = (response, userId) => {

  UserModel.findById(userId)
  .then(data => {
    if(data) {
      console.log(data.campaigns);
      response.json(data.campaigns);
    }

    response.send('Nope.');
  })
  .catch((err) => {
    response.send('Error!');
    console.log(err);
  });

}


module.exports = { createCampaign, getAllCampaigns };
