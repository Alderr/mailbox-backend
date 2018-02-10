const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');

const createCampaign = (campaign, userId) => {
  console.log(userId);
  console.log(campaign);

  UserModel.findById(userId)
    .then((data) => {
      console.log(data.campaigns[0].lists);
      data.campaigns = [...data.campaigns, campaign]
      return data.save();
    })
    .then(response => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });;
}

const getAllCampaigns = (userId) => {

}


module.exports = { createCampaign };
