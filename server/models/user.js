// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
    userID          : String,
    firstName       : String,
    username        : String,
    timeZone        : Integer,
    defaultPrivacy  : String
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);