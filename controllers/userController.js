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
        });
};

const getUser = (userId) => {

    return UserModel.findById(userId)
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



module.exports = { createUser, getUser, getAllUsers, findUser };
