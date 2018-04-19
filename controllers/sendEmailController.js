const axios = require('axios');

const { getList } = require('./listController');
const { updateEventDataCampaignContacts } = require('./eventDataController');
const AWS_SES_SERVER_URL_NOW = process.env.AWS_SES_SERVER_URL_NOW;

const sendEmailNow = (userId, campaign) => {

    //gist: creating a campaign obj to send of to AWS_SES_SERVER

    //get specific list(s) mentioned in campaign;
    Promise.all(campaign.lists.map(aList => getList(aList.id, userId)))
        .then(data => {
            let allLists = [];

            //combine all lists together in one arr
            for(let list in data) {
                allLists = allLists.concat(data[list].contacts);
            }

            // save the list of contacts a client used for the campaign for future use
            updateEventDataCampaignContacts(campaign.campaign_event_data_id, allLists)
                .catch(err => {
                    return err;
                });

            //then, attach allList to campaign; [campaign] - the data in the correct format for sendEmail
            campaign.contacts = allLists;

            //send the campaign/data to AWS_SES_SERVER w/ a POST request
            axios({
                method: 'post',
                url: AWS_SES_SERVER_URL_NOW,
                data: campaign
            })
                .then(data => {
                    return ('Succesful', data);
                })
                .catch(err => {
                    return err;
                });
        })
        .catch(err => {
            return err;
        });

};



module.exports = { sendEmailNow };
