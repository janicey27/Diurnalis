// import node modules
const mongoose = require('mongoose');

// define a schema
const ResponseModelSchema = new mongoose.Schema ({
    creatorID       : String,
    creatorUsername : { type: String, lowercase: true },
    day             : Number,
    month           : Number,
    year            : Number,
    content         : String,
    privacy         : String,
    upvotes         : Number,
    upvoteUsers     : [String]
});

// compile model from schema
module.exports = mongoose.model('ResponseModel', ResponseModelSchema);