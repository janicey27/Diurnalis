// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
    googleid        : String,
    name            : String,
    username        : { type: String, lowercase: true },
    defaultPrivacy  : String
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);