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
            response.status(201).json(savedList);

        })
        .catch((err) => {
            console.log(err);
        });



};

const getAllLists = (response, userId) => {

    UserModel.findById(userId)
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

const getList = (response, listId, userId) => {

    UserModel.findById(userId)
        .then((data) => {

            if (data) {

                const foundList = data.lists.find(list => {
                    return list.id == listId;
                });

                if (foundList) {
                    response.json(foundList);
                }

                //list doesnt exist
                else {
                    response.send('Nope. No list!');
                    return Promise.reject('Error!');
                }
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

const updateList = (response, listId, userId) => {
  
    UserModel.findById(userId)
        .then((data) => {

            if (data) {

                const foundList = data.lists.find(list => {
                    return list.id == listId;
                });

                if (foundList) {
                    response.json(foundList);
                }

                //list doesnt exist
                else {
                    response.send('Nope. No list!');
                    return Promise.reject('Error!');
                }
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
    getList,
    getAllLists,
    updateList
};
