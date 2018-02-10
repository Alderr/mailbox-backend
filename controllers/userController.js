const UserModel = require('../models/userModel');
const EventDataModel = require('../models/eventDataModel');

const createUser = (user) => {
  console.log(user);
  UserModel.create(user)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });;
}


module.exports = { createUser };
