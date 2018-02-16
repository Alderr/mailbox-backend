const UserModel = require('../models/userModel');

const addContact = (listId, obj, userId) => {
    return UserModel.findById(userId)
        .then((data) => {
            const { firstName, lastName, email } = obj;

            if (data) {

                const foundList = data.lists.find(list => {
                    return list.id == listId;
                });

                console.log('foundList', foundList);


                if (foundList) {
                    foundList.contacts = [...foundList.contacts, {firstName, lastName, email}];
                    return data.save();
                }

                //list doesnt exist
                else {
                    return 'No such list!';
                }
            }

            //user doesnt exist
            else {
                return 'No such user!!';
            }
        })
        .then(updatedUser => {
            console.log('I updated the data?');
            console.log(updatedUser.lists);
            console.log('--------------------');
            return updatedUser.lists;
        })
        .catch((err) => {
            console.log(err);
        });
};

const deleteContacts = (response, listId, contact_ids, userId) => {

};

const deleteContact = (response, listId, contact_id, userId) => {

};


module.exports = {
    addContact
};
