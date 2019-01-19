// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
    googleID        : String,
    firstName       : String,
    username        : { type: String, lowercase: true },
    timeZone        : Number,
    defaultPrivacy  : String
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);