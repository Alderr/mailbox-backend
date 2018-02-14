const axios = require('axios');

const { getList } = require('./listController');

const sendEmailNow = (userId, campaign) => {

    //gist: creating a campaign obj to send of to AWS_SES_SERVER

    const AWS_SES_SERVER_URL_NOW = process.env.AWS_SES_SERVER_URL_NOW;
    console.log('AWS_SES_SERVER_URL_NOW', AWS_SES_SERVER_URL_NOW);
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

            //attach allList to object aka campaign & replace
            campaign.contacts = allLists;
            console.log('campaign.contacts', JSON.stringify(campaign.contacts, null, 2));
            console.log('-------------------campaign.contacts---------------');

            //send the campaign to AWS_SES_SERVER
            //Send a POST request
            axios({
                method: 'post',
                url: AWS_SES_SERVER_URL_NOW,
                data: campaign
            })
                .then(data => {
                    //console.log(data);
                    console.log('---------------Successful!------------');
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });



};



module.exports = { sendEmailNow };
{ sendEmailNow; }
