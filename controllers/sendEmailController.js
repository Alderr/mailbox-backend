const axios = require('axios');

const { getList } = require('./listController');

const sendEmailNow = (userId, campaign) => {

    //gist: creating a campaign obj to send of to AWS_SES_SERVER

    const AWS_SES_SERVER_URL_NOW = process.env.AWS_SES_SERVER_URL_NOW;
    console.log('AWS_SES_SERVER_URL', AWS_SES_SERVER_URL);
    //console.log('CAMPAIGN', JSON.stringify(campaign, null, 2));

    console.log('LISTS', campaign.lists);
    console.log('---------------LISTS---------------');


    //get specific list(s) mentioned in campaign;
    Promise.all(campaign.lists.map(aList => {
        return getList(aList.id, userId);
    }))
        .then(data => {
            console.log('DATA AKA LISTS', JSON.stringify(data, null, 2));
            console.log('------------------DATA AKA LISTS-----------------S');
            let allLists = [];

            //combine all lists together in one arr
            for(let list in data) {
                allLists = allLists.concat(data[list].contacts);
            }

            //attach allList to object aka campaign
            campaign.lists = allLists;
            console.log('CAMPAIGN.LISTS', JSON.stringify(campaign.lists, null, 2));
            console.log('-------------------CAMPAIGN.LISTS---------------');

            //send the campaign to AWS_SES_SERVER
            //Send a POST request
            axios({
                method: 'post',
                url: AWS_SES_SERVER_URL_NOW,
                data: campaign
            })
                .then(data => {
                    console.log(data);
                    console.log('---------------Successful!------------');
                });
        })
        .catch(err => {
            console.log(err);
        });



};



module.exports = { sendEmailNow };
{ sendEmailNow; }
