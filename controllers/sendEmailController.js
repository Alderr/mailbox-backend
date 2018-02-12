const axios = require('axios');

const sendEmailNow = (userId, campaign) => {

    //gist: creating a campaign obj to send of to AWS_SES_SERVER

    const AWS_SES_SERVER_URL = process.env.AWS_SES_SERVER_URL;
    console.log('AWS_SES_SERVER_URL', AWS_SES_SERVER_URL);
    //console.log('CAMPAIGN', JSON.stringify(campaign, null, 2));

    console.log('LISTS', campaign.lists);
    //get all of the list(s) from user

    //attach the list to object

    //send to AWS_SES_SERVER
};

module.exports = { sendEmailNow };
