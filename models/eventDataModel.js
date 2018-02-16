const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const CampaignEventDataSchema = mongoose.Schema({
    delivery:
      {
          emails: [
              { type: String, required: true }
          ]
      }
    ,
    open:
      {
          emails: [
              { type: String, required: true }
          ]
      }
    ,
    click:
      {
          emails: [
              {
                  email: { type: String, required: true },
                  clickEvents: [
                      {
                          timestamp: { type: String, required: true },
                          link: { type: String, required: true }
                      }
                  ]
              }
          ]
      }
/* click: {
      emails: [
      email:
      clickEvents: {
      date:
      link:
    }
    ]
} */
});


CampaignEventDataSchema.methods.serialize = function () {
    console.log(this);

    return {
        id: this._id,
        send: this.send,
        open: this.open,
        click: this.click
    };
};

const CampaignEventDataModel = mongoose.model('CampaignEventData', CampaignEventDataSchema);

module.exports = CampaignEventDataModel;
