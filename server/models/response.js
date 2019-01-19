// import node modules
const mongoose = require('mongoose');

// define a schema
const ResponseModelSchema = new mongoose.Schema ({
    creatorID       : String,
    creatorUsername : { type: String, lowercase: true },
    date            : Number,
    year            : Number,
    response        : String
});

// compile model from schema
module.exports = mongoose.model('ResponseModel', ResponseModelSchema);