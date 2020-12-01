const Contacts = require('../contact.model');
const User = require('../user.model');

/*1 to N relationship
a user will have many contacts
*/

// User.hasMany(Contacts)

// Contacts.belongsTo(User)