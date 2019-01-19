const mongoose = require('mongoose');

// set up mongoDB connection
const mongoURL = 'mongodb+srv://admin:notapassword@cluster0-0nkjc.mongodb.net/test?retryWrites=true'; // TODO modify
const options = { useNewUrlParser: true };
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;