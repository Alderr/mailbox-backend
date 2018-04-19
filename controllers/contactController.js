const UserModel = require('../models/userModel');

const addContact = (listId, obj, userId) => {
    return UserModel.findById(userId)
        .then((data) => {
            const { firstName, lastName, email } = obj;

            if (data) {

                const foundList = data.lists.find(list => {
                    return list.id == listId;
                });


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
            return updatedUser.lists;
        })
        .catch((err) => {
            return err;
        });
};


const deleteContact = (listId, contactId, userId) => {
    return UserModel.findById(userId)
        .then((data) => {

            if (data) {

                const foundList = data.lists.find(list => {
                    return list.id == listId;
                });

                const newContacts = foundList.contacts.filter(contact => contact.id !== contactId);

                if (foundList) {
                    foundList.contacts = newContacts;
                    return data.save();
                }

                //list doesnt exist
                else {
                    throw new Error('No such list');
                }
            }

            //user doesnt exist
            else {
                throw new Error('No such user');
            }
        })
        .then(updatedUser => updatedUser.lists)
        .catch((err) => {
            return err;
        });
};


module.exports = {
    addContact,
    deleteContact
};
