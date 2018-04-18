const UserModel = require('../models/userModel');
const { getEventDataCampaign } = require('./eventDataController');

const createUser = (user) => {
    // Check if password & username are valid
    // Check if user doesnt exist already

    const { username } = user;

    return findUser(username)
        .then((response) => {

            if (response !== 'Wrong credentials') {
                return UserModel.create(user).then((newUser) => newUser._id);
            }

            return response;
        });
};

const getUser = (userId) => {

    return UserModel.findById(userId, '', { lean: true })
        .then((data) => {
            return data;
        })
        .catch(() => { // No need for err; user wasnt found
            return 'No such user!';
        });
};

const getAllUsers = () => {

    return UserModel.find()
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });
};

const findUser = (username, password = null) => {
    // Depending on whether or not password was given - mainly registering
    const user = password === null ? { username } : { username, password };

    return UserModel.find(user)
        .then((data) => {

            if (data[0]) {
                return data[0].id;
            }

            else {
                return 'Wrong credentials!';
            }
        })
        .catch((err) => {
            return err;
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
            return err;
        });
};

const getRecentCampaigns = (campaigns) => {
    //empty
    if (campaigns.length === 0) {
        return [];
    }
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
