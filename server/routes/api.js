// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const Question = require('../models/question');
const Response = require('../models/response');
const User = require('../models/user');

// Express router
const router = express.Router();


// api GET endpoints

router.get('/test', function(req, res) {
    res.send('reeeee');
    console.log("Hi there!")
    const io = req.app.get('socketio');
    io.emit("test");
});

router.get('/whoami', function(req, res) {
    if(req.isAuthenticated()) {
        res.send(req.user);
    }
    else {
        res.send({});
    }
});

router.get('/questions', function(req, res) {
    Question.find({}, function(err, questions) {
        res.send(questions);
    })
});

router.get('/responses', function(req, res) {
    const filters = { privacy: {$in: ["public", "anonymous"]} }; // TODO add privacy filter
    if (parseBoolean(req.body.me)) filters._id = req.user._id;
    filters.date = parseInt(req.query.date); // TODO some sort of random pull? so we don't get too many
    if (req.query.year) filters.year = parseInt(req.query.year);
    // TODO retrieve all responses or just the user
    const count = req.count; // TODO

    Response.find(filters, function(err, responses) {
        res.send(responses);
    });
});


// api POST endpoints

router.post('/user', function(req, res) {
    const updatedUser = {};

    if (req.body.name) updatedUser.name = req.body.name;
    if (req.body.username) updatedUser.username = req.body.username;
    if (req.body.timeZone) updatedUser.timeZone = parseInt(req.body.timeZone);
    if (req.body.privacy) updatedUser.defaultPrivacy = req.body.privacy;

    User.findOneAndUpdate({ _id: req.user._id }, updatedUser, function(err, user) {
        res.send({});
    });
});

router.post(
    '/response',
    connect.ensureLoggedIn(),
    function(req, res) {
        const currentUser = User.findOne({ _id: req.user._id }, function(err, user) {
            return user;
        });

        const newResponse = new Response({
            creatorID       : currentUser._id,
            creatorUsername : currentUser.username,
            date            : parseInt(req.body.date),
            year            : parseInt(req.body.year),
            content         : req.body.content,
            privacy         : req.body.privacy,
            upvotes         : 0
        });
        
        newResponse.save(function(err, response) {
            const io = req.app.get('socketio');
            io.emit("post", response);
        });

        res.send({});
    }
);

router.post(
    '/upvote',
    connect.ensureLoggedIn(),
    function(req, res) {
        Response.findOneAndUpdate(
            { _id: req.body.parent._id },
            { upvotes: req.body.parent.upvotes + 1 - 2*parseBoolean(req.body.remove)},
            function(err, user) {
                const io = req.app.get('socketio');
                io.emit("upvote", response);
            }
        );
        res.send({});
    }
);

module.exports = router;