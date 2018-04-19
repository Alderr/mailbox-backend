const UserModel = require('../models/userModel');

const { createEventDataCampaign } = require('./eventDataController');
const { sendEmailNow } = require('./sendEmailController');

const createCampaign = (newCampaign, userId) => {
    //user has a list, they create a campaign
    //first an eventDataCampaign obj is created for future [events] in COLLECTION
    //that eventDataCampaign id is saved onto UserModel-campaign obj aka campaign var
    //second, a campaign is created in COLLECTION
    //the created userModel-campaign is sent to aws-ses-server!


    //create eventCampaign & get id of it
    return createEventDataCampaign()
        .then(data => {

            //attach id to campaign
            newCampaign.campaign_event_data_id = data._id;

            //add campaign to specific user but first find it
            return UserModel.findById(userId)
                .then((data) => {

                    //save campaign onto user obj
                    if (data) {
                        data.campaigns = [...data.campaigns, newCampaign];
                        return data.save();
                    }

                    //user doesnt exist
                    else {
                        throw new Error('Error!');
                    }
                })
                .then(() => {

                    // send the campaign ASAP
                    sendEmailNow(userId, newCampaign);

                    // return a response for the client
                    return 'Created campaign';
                })
                .catch((err) => {
                    return err;
                });
        });

};

const getAllCampaigns = (userId) => {

    return UserModel.findById(userId)
        .then(data => {
            if(data) {
                return data.campaigns;
            }

            return 'No such user!';
        })
        .catch((err) => {
            return err;
        });

};


const deleteCampaign = (userId, campaignId) => {
    return UserModel.findById(userId)
        .then((data) => {

            if (data) {
                const newCampaigns = data.campaigns.filter(campaign => {
                    return campaign.id !== campaignId;
                });

                data.campaigns = newCampaigns;
                return data.save();
            }

            //user doesnt exist
            else {
                throw new Error('No such user.');
            }
        })
        .then(newCampaign => {
            return newCampaign.campaigns;
        })
        .catch((err) => {
            return err;
        });

};

module.exports = { createCampaign, getAllCampaigns, deleteCampaign };
