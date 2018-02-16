const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const UserSchema = mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    name: {
        firstName : {type: String},
        lastName: {type: String}
    },
    campaigns: [
        {
            campaign_event_data_id: {type: String},
            date: { type: Number, default: Date.now()},
            name: { type: String, required: true },
            lists:  [{
                id: { type: String, required: true}
            }],
            email_content: {
                subject: { type: String, required: true},
                body: { type: String, required: true },
                sender: { type: String, required: true}
            }
        }
    ],
    lists: [{
        date: { type: Number, default: Date.now()},
        name: { type: String, required: true },
        contacts: [{
            firstName: { type: String},
            lastName: { type: String },
            email: { type: String, required: true},
            date: { type: Number, default: Date.now()},
        }]
    }]
});


UserSchema.methods.serialize = function () {
    console.log(this);

    return {
        id: this._id,
        username: this.username,
        password: this.password,
        name: this.name,
        campaigns: this.campaigns,
        lists: this.lists
    };
};

const UserModel = mongoose.model('Users', UserSchema);

module.exports =  UserModel ;
