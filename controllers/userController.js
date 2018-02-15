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

            if (data) {
                console.log(data);
                console.log('-------------USER BACK------------');
                return data;
            }

            else {
                return 'Failure';
            }
        })
        .catch((err) => {
            console.log(err);
            return 'Failure';
        });
};

const getAllUsers = () => {

    return UserModel.find()
        .then((data) => {

            if (data) {
                console.log(data);
                console.log('-------------USERS BACK------------');
                return data;
            }

            else {
                return 'Failure';
            }
        })
        .catch((err) => {
            console.log(err);
            return 'Failure';
        });
};


const findUser = (user) => {
    const { username, password } = user;

    return UserModel.find(userId)
        .then((data) => {

            if (data) {
                console.log(data);
                console.log('-------------USER BACK------------');
                return data;
            }

            else {
                return 'Failure';
            }
        })
        .catch((err) => {
            console.log(err);
            return 'Failure';
        });
};



module.exports = { createUser, getUser, getAllUsers, findUser };
