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
            console.log(savedList.lists);
            console.log('--------------------');
            return response.status(201).json(savedList);

        })
        .catch((err) => {
            console.log(err);
        });



};

const getAllLists = (userId) => {

    return UserModel.findById(userId)
        .then((data) => {

            //save List onto user obj
            if (data) {
                return data.lists;
            }

            //user doesnt exist
            throw new Error('No such user');
        });
};

const getList = (listId, userId) => {

    return UserModel.findById(userId)
        .then((data) => {

            if (data) {

                const foundList = data.lists.find(list => list.id == listId);

                if (foundList) {
                    return foundList;
                }

                //list doesnt exist
                throw new Error('No such list');
            }

            //user doesnt exist
            throw new Error('No such list');
            
        });
};

const updateList = (listId, newName, userId) => {

    return UserModel.findById(userId)
        .then((data) => {

            if (data) {

                const foundList = data.lists.find(list => {
                    return list.id == listId;
                });

                if (foundList) {
                    foundList.name = newName;
                    return data.save();
                }

                //list doesnt exist
                throw new Error('No such list');
                
            }

            //user doesnt exist
            else {
                response.send('Nope.');
                return Promise.reject('Error!');
            }
        })
        .then(updatedUser => updatedUser._id)
};

const deleteList = (listId, userId) => {

    return UserModel.findById(userId)
        .then((data) => {

            if (data) {

                const newLists = data.lists.filter(list => list.id !== listId);

                data.lists = newLists;
                return data.save();
            }

            //user doesnt exist
            throw new Error('No such list');
        })
        .then(updatedUser => updatedUser._id);
};

module.exports = {
    createList,
    getList,
    getAllLists,
    updateList,
    deleteList
};
