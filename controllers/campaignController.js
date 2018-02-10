const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');

const createCampaign = (campaign, userId) => {
  console.log(userId);
  console.log(campaign);

  // UserModel.findById(userId)
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });;
}


module.exports = { createCampaign };
