const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const CampaignEventDataSchema = mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    name: {
      firstName : {type: String},
      lastName: {type: String}
    },
    campaigns: [
      {
        date: { type: Number, default: Date.now()},
        name: { type: String, required: true },
        email_content: {
          subject: { type: String, required: true},
          body: { type: String, required: true },
          sender: { type: String, required: true}
        }
      }
    ],
    lists: [
      date: { type: Number, default: Date.now()},
      name: { type: String, required: true },
      contacts: [{
        firstName: { type: String},
        lastName: { type: String }
        email: { type: String, required: true}
      }]
    ]
});


CampaignEventData.methods.serialize = function () {
  console.log(this);

  return {
      id: this._id,
      username: this.username,
      password: this.password,
      name: {
        firstName : this.firstName,
        lastName: this.lastName
      },
      campaigns: this.campaigns,
      lists: this.lists
  };
}

const CampaignEventDataModel = mongoose.model('CampaignEventData', CampaignEventDataSchema);

module.exports = { CampaignEventDataModel };
