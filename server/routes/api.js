// dependencies
const express = require('express');
const connect = require('connect-ensure-login');
const fs = require('fs');
const path = require('path');

// models
const Response = require('../models/response');
const User = require('../models/user');

// Express router
const router = express.Router();


// api GET endpoints

router.get('/test', function(req, res) {
    const io = req.app.get('socketio');
    io.emit("test");
    res.send('This is a test.');
});

router.get('/whoami', function(req, res) {
    if(req.isAuthenticated()) {
        res.send(req.user);
    }
    else {
        res.send({});
    }
});

// TODO fix
router.get('/questions', function(req, res) {
    fs.readFile(path.join(__dirname, '..', 'questions.json'), { encoding: 'utf8' }, function(err, data) {
        data = JSON.parse(data);
        res.send(JSON.stringify(data));
    });
});

router.get('/responses', function(req, res) {
    const filters = {};

    if (req.query.day) filters.day = parseInt(req.query.day);
    if (req.query.month) filters.month = parseInt(req.query.month);
    if (req.query.year) filters.year = parseInt(req.query.year);

    const count = req.count; // TODO some sort of random pull? so we don't get too many

    if (req.query.me === 'true') {
        if (req.isAuthenticated()) {
            filters.creatorID = req.user._id;
            Response.find(filters, function(err, responses) {
                res.send(responses);
            });
        } else {
            console.log("no responses because user not logged in");
            return res.send({});
        }
    } else {
        let responses = [];
        filters.privacy = "public";
        Response.find(filters, function(err, publicResponses) {
            responses = responses.concat(publicResponses);
            filters.privacy = "anonymous";
            Response.find(filters, function(err, anonResponses) {
                let i;
                for (i=0; i<anonResponses.length; i++) {
                    anonResponses[i].username = "anonymous"; // uncertain if this works
                    // console.log(anonResponses[i]);
                }
                responses = responses.concat(anonResponses);
                res.send(responses);
            });
        });
    }
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
        const responseDay = parseInt(req.body.day);
        const responseMonth = parseInt(req.body.month);
        const responseYear = parseInt(req.body.year);

        User.findOne({ _id: req.user._id }, function(err, currentUser) {
            Response.findOne({
                creatorID   : currentUser._id,
                day         : responseDay,
                month       : responseMonth,
                year        : responseYear
            }, function(err, response) {
                if (!response) {
                    const newResponse = new Response({
                        creatorID       : currentUser._id,
                        creatorUsername : currentUser.username,
                        day             : responseDay,
                        month           : responseMonth,
                        year            : responseYear,
                        content         : req.body.content,
                        privacy         : req.body.privacy,
                        upvotes         : 0
                    });
                    newResponse.save(function(err, response) {
                        const io = req.app.get('socketio');
                        io.emit("post", response);
                        res.send({});
                    });
                } else {
                    Response.findOneAndUpdate(
                        { _id: response._id },
                        {
                            content : req.body.content, // TODO for some reason response is not updating
                            privacy : req.body.privacy
                        },
                        function(err, response) {
                            const io = req.app.get('socketio');
                            io.emit("edit", response);
                            res.send({});
                        }
                    );
                }
            });
        });
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