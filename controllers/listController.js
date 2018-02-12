const UserModel = require('../models/userModel');

const createList = (response, newList, userId) => {


    //add List to specific user but first find the user
    UserModel.findById(userId)
        .then((data) => {

            //save List onto user obj
            if (data) {
                console.log('all Lists!', data);
                data.lists = [...data.lists, newList];
                return data.save();
            }

            //user doesnt exist
            else {
                response.send('Nope.');
                return Promise.reject('Error!');
            }
        })
        .then(savedList => {
            console.log('I saved the data?');
            console.log(savedList);
            console.log('--------------------');
            response.status(201).send('Added.');

        })
        .catch((err) => {
            console.log(err);
        });



};

const getAllLists = (response) => {

    UserModel.find()
        .then((data) => {

            //save List onto user obj
            if (data) {
                console.log('all Lists!', data.lists);
                response.json(data.lists);
            }

            //user doesnt exist
            else {
                response.send('Nope.');
                return Promise.reject('Error!');
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    createList,
    getAllLists
};
