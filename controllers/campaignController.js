const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');

const { createEventDataCampaign } = require('./eventDataController');

const createCampaign = (response, campaign, userId) => {
    //user has a list, they create a campaign
    //first an eventDataCampaign obj is created for future [events] in COLLECTION
    //that eventDataCampaign id is saved onto UserModel-campaign obj aka campaign var
    //second, a campaign is created in COLLECTION
    //the created userModel-campaign is sent to aws-ses-server!

    console.log(userId);
    console.log(campaign);

    //create eventCampaign & get id of it
    createEventDataCampaign()
        .then(data => {

            //attach id to campaign
            campaign.campaignEventId = data._id;

            //add campaign to specific user
            UserModel.findById(userId)
                .then((data) => {

                    if (data) {
                        console.log('all campaigns!', data);
                        data.campaigns = [...data.campaigns, campaign];
                        return data.save();
                    }

                    else {
                        console.log('Nope?');
                        return response.send('Nope.');
                    }
                })
                .then(res => {
                    console.log('I saved the data?');
                    console.log(res);
                    console.log('--------------------');
                    return response.status(201).send('Added.');
                })
                .catch((err) => {
                    console.log(err);
                });

        });

};

//not done
const getCampaign = (response, userId, campaignId) => {

}

const getAllCampaigns = (response, userId) => {

    UserModel.findById(userId)
        .then(data => {
            if(data) {
                return response.json(data.campaigns);
            }

            return response.send('Nope.');
        })
        .catch((err) => {
            response.send('Error!');
            console.log(err);
        });

};

//not done
const updateCampaign = (response, userId, campaignId) => {

}

//not done
const deleteCampaign = (response, userId, campaignId) => {

}

module.exports = { createCampaign, getAllCampaigns };
