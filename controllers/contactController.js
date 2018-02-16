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

const deleteContact = (listId, contactId, userId) => {
    return UserModel.findById(userId)
        .then((data) => {

            if (data) {

                const foundList = data.lists.find(list => {
                    return list.id == listId;
                });

                const newContacts = foundList.contacts.filter(contact => {
                    console.log('contact._id', typeof(contact.id));
                    console.log('CONTACTID', typeof(contactId));
                    console.log('CONTACT._ID !== CONTACTID', contact._id !== contactId);
                    return contact.id !== contactId;


                });

                console.log('foundList', foundList);
                console.log('newContacts', newContacts);

                if (foundList) {
                    foundList.contacts = newContacts;
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


module.exports = {
    addContact,
    deleteContact
};
