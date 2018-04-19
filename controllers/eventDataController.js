const EventDataModel = require('../models/eventDataModel');

const createEventDataCampaign = () => {
    return EventDataModel.create({})
        .then(data => data)
        .catch(err => err);
};

const getAllEventDataCampaigns = () => {
    return EventDataModel.find()
        .then(data => data)
        .catch(err => err);
};

const getEventDataCampaign = (id) => {
    return EventDataModel.findById(id, '', {lean: true})
        .then(data => data)
        .catch(err => err);
};

const updateEventDataCampaignContacts = (id, contacts) => {
    return EventDataModel.findById(id)
        .then((data) => {
            if (data) {
                data.contacts = contacts.map(contact => contact.email);
                return data.save();
            }

            else {
                throw new Error('No such user');
            }
        })
        .then(res => {
            return ('Added? update event data contacts', res);
        })
        .catch((err) => err);
};

module.exports =
{
    createEventDataCampaign,
    getAllEventDataCampaigns,
    getEventDataCampaign,
    updateEventDataCampaignContacts
};
