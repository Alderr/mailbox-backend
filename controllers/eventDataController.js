const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');

const createEventDataCampaign = () => {
    return EventDataModel.create({})
        .then(data => {
            console.log('I created the campaign?');
            console.log(data);
            console.log('-----------------------');
            return data;
        })
        .catch(err => {
            console.log(err);
        });
};

const getAllEventDataCampaigns = (response) => {
    EventDataModel.find()
        .then(data => {
            console.log(data);
            response.json(data);
        })
        .catch(err => {
            console.log(err);
        });
};

const getEventDataCampaign = (id) => {
    return EventDataModel.findById(id)
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
};

const updateEventDataCampaign = (response, id, data) => {
    EventDataModel.findById(id)
        .then((data) => {
            if (data) {
                console.log(data);
                // data.campaigns = [...data.campaigns, campaign]
                // return data.save();
            }
            else {
                return response.send('Nope.');
            }
        })
    // .then(res => {
    //   console.log(res);
    //   return response.status(201).send('Added.');
    // })
        .catch((err) => {
            console.log(err);
        });
};

const updateEventDataCampaignContacts = (id, contacts) => {
    return EventDataModel.findById(id)
        .then((data) => {
            if (data) {
                console.log(data);
                data.contacts = contacts.map(contact => contact.email);
                return data.save();
            }

            else {
                return 'No such user';
            }
        })
        .then(res => {
            console.log(res);
            return 'Added? update event data contacts';
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};
module.exports =
{
    createEventDataCampaign,
    getAllEventDataCampaigns,
    getEventDataCampaign,
    updateEventDataCampaign,
    updateEventDataCampaignContacts
};
