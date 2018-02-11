const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');

const { createEventDataCampaign } = require('./eventDataController');

const createCampaign = (response, campaign, userId) => {
  //user has a list, creates a campaign
  //campaign is created first
  //then an eventDataCampaign obj is created for future [events]
  //that eventDataCampaign id is saved onto UserModel-campaign obj
  //the created userModel-campaign is sent to aws-ses-server!

  console.log(userId);
  console.log(campaign);

  response.send('create campaign!');
  //create eventCampaign & get id of it

  const campaign_id = createEventDataCampaign();
  console.log('campaign_id ', campaign_id);
  // UserModel.findById(userId)
  //   .then((data) => {
  //     if (data) {
  //       console.log(data.campaigns);
  //       data.campaigns = [...data.campaigns, campaign]
  //       return data.save();
  //     }
  //     else {
  //       return response.send('Nope.');
  //     }
  //   })
  //   .then(res => {
  //     console.log(res);
  //     return response.status(201).send('Added.');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}

const getAllCampaigns = (response, userId) => {

  UserModel.findById(userId)
  .then(data => {
    if(data) {
      console.log(data.campaigns);
      return response.json(data.campaigns);
    }

    return response.send('Nope.');
  })
  .catch((err) => {
    response.send('Error!');
    console.log(err);
  });

}


module.exports = { createCampaign, getAllCampaigns };
