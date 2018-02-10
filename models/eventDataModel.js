const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const CampaignEventDataSchema = mongoose.Schema({
    send: [
      {
        count: { type: Number },
        emails: [
          { type: String, required: true }
        ]
      }
    ],
    open: [
      {
        count: { type: Number },
        emails: [
          { type: String, required: true }
        ]
      }
    ],
    click: [
      {
        count: { type: Number },
        emails: [
          { type: String, required: true }
        ]
      }
    ]
});


CampaignEventDataSchema.methods.serialize = function () {
  console.log(this);

  return {
      id: this._id,
      send: this.send,
      open: this.open,
      click: this.click
  };
}

const CampaignEventDataModel = mongoose.model('CampaignEventData', CampaignEventDataSchema);

module.exports = { CampaignEventDataModel };
