// import node modules
const mongoose = require('mongoose');

// define a schema
const ResponseModelSchema = new mongoose.Schema ({
    creatorID       : String,
    creatorUsername : String,
    date            : Integer,
    year            : Integer,
    question        : String, // do we need this? / where are we storing questions / how are we retrieving questions
    response        : String
});

// compile model from schema
module.exports = mongoose.model('ResponseModel', ResponseModelSchema);