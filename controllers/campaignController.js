const UserModel = require('../models/userModel');

const { createEventDataCampaign } = require('./eventDataController');
const { sendEmailNow } = require('./sendEmailController');

const createCampaign = (response, newCampaign, userId) => {
    //user has a list, they create a campaign
    //first an eventDataCampaign obj is created for future [events] in COLLECTION
    //that eventDataCampaign id is saved onto UserModel-campaign obj aka campaign var
    //second, a campaign is created in COLLECTION
    //the created userModel-campaign is sent to aws-ses-server!

    // console.log(userId);
    // console.log(campaign);

    //create eventCampaign & get id of it
    createEventDataCampaign()
        .then(data => {

            //attach id to campaign
            newCampaign.campaign_event_data_id = data._id;

            //add campaign to specific user but first find it
            UserModel.findById(userId)
                .then((data) => {

                    //save campaign onto user obj
                    if (data) {
                        console.log('all campaigns!', data);
                        data.campaigns = [...data.campaigns, newCampaign];
                        return data.save();
                    }

                    //user doesnt exist
                    else {
                        response.send('Nope. No such user.');
                        return Promise.reject('Error!');
                    }
                })
                .then(savedCampaign => {
                    console.log('I saved the data?');
                    console.log(savedCampaign);
                    console.log('--------------------');
                    response.status(201).send('Added.');

                    //send the campaign ASAP
                    sendEmailNow(userId, newCampaign);
                })
                .catch((err) => {
                    console.log(err);
                });

        });

};

//not done
const getCampaign = (response, userId, campaignId) => {

};

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

};

//not done
const deleteCampaign = (response, userId, campaignId) => {

};

module.exports = { createCampaign, getAllCampaigns };
