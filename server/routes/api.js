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
    const filters = {};
    if (req.query.me === 'true') {
        if (req.isAuthenticated()) {
            filters._id = req.user._id;
        } else {
            // return res.send({});
        }
    } else {
        filters.privacy = {$in: ["public", "anonymous"]}
    }
    if (req.query.date !== null) filters.date = parseInt(req.query.date);
    if (req.query.year !== null) filters.year = parseInt(req.query.year);

    const count = req.count; // TODO some sort of random pull? so we don't get too many

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

        let responseDate = parseInt(req.body.date);
        let responseYear = parseInt(req.body.year);

        Response.findOne({
            creatorID   : currentUser._id,
            date        : responseDate,
            year        : responseYear
        }, function(err, response) {
            if (!response) {
                const newResponse = new Response({
                    creatorID       : currentUser._id,
                    creatorUsername : currentUser.username,
                    date            : responseDate,
                    year            : responseYear,
                    content         : req.body.content,
                    privacy         : req.body.privacy,
                    upvotes         : 0
                });
                
                console.log("pls");
                newResponse.save(function(err, response) {
                    const io = req.app.get('socketio');
                    io.emit("post", response);
                });
                console.log("thanks");
            } else {
                console.log("uh");
                Response.findOneAndUpdate(
                    { _id: response._id },
                    {
                        content : req.body.content, // TODO for some reason response is not updating
                        privacy : req.body.privacy
                    },
                    function(err, response) {
                        const io = req.app.get('socketio');
                        io.emit("edit", response);
                    }
                );
                console.log(response);
            }
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
            { upvotes: req.body.parent.upvotes + ((req.body.remove === 'true') ? -1 : 1)},
            function(err, user) {
                const io = req.app.get('socketio');
                io.emit("upvote", response);
            }
        );
        res.send({});
    }
);

module.exports = router;