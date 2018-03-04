const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');
const { getEventDataCampaign } = require('./eventDataController');

const createUser = (user) => {

    console.log(user);

    UserModel.create(user)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
};

const getUser = (userId) => {

    return UserModel.findById(userId, '', { lean: true })
        .then((data) => {

            console.log(data);
            console.log('-------------USER BACK------------');
            return data;

        })
        .catch((err) => {
            console.log(err);
            return 'No such user!';
        });
};

const getAllUsers = () => {

    return UserModel.find()
        .then((data) => {

            console.log(data);
            console.log('-------------USERS BACK------------');
            return data;

        })
        .catch((err) => {
            console.log(err);
            return 'Failure';
        });
};

const findUser = (username, password) => {

    return UserModel.find({username, password})
        .then((data) => {

            if (data[0]) {
                console.log(data[0].id);
                console.log('-------------USER BACK------------');
                return data[0].id;
            }

            else {
                return 'Wrong credentials!';
            }
        })
        .catch((err) => {
            console.log(err);
            return 'Failure';
        });
};

const getUserSummaryData = (userId) => {
    /*
    Summary:
    > totalSubscribers [x]
    > totalEmailsSent [eventDataTotalCount]
    > totalClicks [eventDataTotalCount]
    > totalOpens [eventDataTotalCount]
    > totalBounced [later]
    > recent2Campaigns [x]
    */
    let recentCampaigns;
    let totalSubscribers;
    let eventDataTotalCount;

    return getUser(userId)
        .then(userData => {
            //get needed data from userData
            recentCampaigns = getRecentCampaigns(userData.campaigns);
            totalSubscribers = countSubscribers(userData.lists);

            //get all event data from all user's campaigns to get totals
            const eventCampaignIds = getAllEventCampaignIds(userData.campaigns);
            return Promise.all(eventCampaignIds.map(id => getEventDataCampaign(id)));

        })
        .then(allEventDataCampaignsData => {
            //get totals for events
            eventDataTotalCount = countEvents(allEventDataCampaignsData);
            console.log('DATA', JSON.stringify(allEventDataCampaignsData, null, 2));

            //attach the event data that belongs to a recent campaign
            recentCampaigns = recentCampaigns.map(campaign => {

                let recentEventData = allEventDataCampaignsData.find(eventCampaign => {
                    return (campaign.campaign_event_data_id == eventCampaign._id);
                });

                if (recentEventData) {
                    let recentEventDataCount = countEvents([recentEventData]);
                    campaign.eventData = recentEventDataCount;
                }

                return campaign;

            });

            return { recentCampaigns, totalSubscribers, eventDataTotalCount };

        })
        .catch(err => {
            console.log('Error!');
            console.log(err);
            return err;
        });
};

const getRecentCampaigns = (campaigns) => {
    //empty
    if (campaigns.length === 0) {
        return [];
    }
    console.log('================================');
    //only 1
    if (campaigns.length < 2) {
        return campaigns[0];
    }

    return [campaigns[campaigns.length-1], campaigns[campaigns.length-2]];
};

const getAllEventCampaignIds = (campaigns) => {
    return campaigns.map(campaign => campaign.campaign_event_data_id);
};

const countSubscribers = (lists) => {

    let counter = 0;

    lists.forEach(list => {
        counter += list.contacts.length;
    });

    return counter;

};

const countEvents = (eventDataCampaigns) => {

    console.log(eventDataCampaigns);
    console.log('---------------------------');
    let totalEmailsSent = 0;
    let totalClicks = 0;
    let totalOpens = 0;

    /*data structure:
      [{
      click: {
        emails: [{email, clickEvents:[1,2,3] }]
        }
      },
      open: {
        emails: [{email}]
      },
      delivery: {
        emails: [{email}]
      }]
    */
    eventDataCampaigns.forEach(campaign => {
        totalEmailsSent += campaign.delivery.emails.length;
        totalOpens += campaign.open.emails.length;
        totalClicks += campaign.click.emails.reduce((total, email) => total + email.clickEvents.length, 0);
    });

    return { totalEmailsSent, totalClicks, totalOpens};
};

module.exports = { createUser, getUser, getAllUsers, findUser, getUserSummaryData };
