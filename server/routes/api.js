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

// GET a JSON of all questions for all days
router.get('/questions', function(req, res) {
    fs.readFile(path.join(__dirname, '..', 'questions.json'), { encoding: 'utf8' }, function(err, data) {
        if (err) {
            res.send(JSON.stringify([{
                "day": 0,
                "month": 0,
                "content": "Is this a strange question?"
            }]));
            return;
        }
        data = JSON.parse(data);
        res.send(JSON.stringify(data));
    });
});

// GET all public and anonymous responses that match certain filters
//      filters: day, month, year
// or GET all responses by the current user
router.get('/responses', function(req, res) {
    const filters = {};

    if (req.query.day) filters.day = parseInt(req.query.day);
    if (req.query.month) filters.month = parseInt(req.query.month);
    if (req.query.year) filters.year = parseInt(req.query.year);

    if (req.query.me === 'true') {
        if (req.isAuthenticated()) {
            filters.creatorID = req.user._id;
            Response.find(filters, function(err, responses) {
                res.send(responses);
            });
        } else {
            return res.send({});
        }
    } else {
        filters.privacy = "public";
        Response.find(filters, function(err, publicResponses) {
            let responses = publicResponses;
            filters.privacy = "anonymous";
            Response.find(filters, function(err, foundResponses) {
                const anonResponses = foundResponses;
                let i, response;
                for (i=0; i<anonResponses.length; i++) {
                    response = anonResponses[i];
                    response.creatorID = "anonymous";
                    response.creatorUsername = "anonymous";
                    anonResponses[i] = response;
                }
                responses = responses.concat(anonResponses);
                res.send(responses);
            });
        });
    }
});


// api POST endpoints

// POST modified user info
router.post('/user', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) { // checks if there is a user with the new username
        if (!user || (user._id === req.user._id)) { // true if no such user exists, or if the current user is not changing username
            const updatedUser = {};
            if (req.body.name) updatedUser.name = req.body.name;
            if (req.body.username) updatedUser.username = req.body.username;
            if (req.body.privacy) updatedUser.defaultPrivacy = req.body.privacy;
            User.findOneAndUpdate({ _id: req.user._id }, updatedUser, function(err, user) {
                res.send(true);
            });
        } else {
            res.send(false);
        }
    });
});

router.get('/getUsers', function(req, res) {
    User.find({}, function(err, users) {
        res.send(users);
    });
});

// POST new or edit response
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
                if (!response) { // new response
                    const newResponse = new Response({
                        creatorID       : currentUser._id,
                        creatorUsername : currentUser.username,
                        day             : responseDay,
                        month           : responseMonth,
                        year            : responseYear,
                        content         : req.body.content,
                        privacy         : req.body.privacy,
                        upvotes         : 0,
                        upvoteUsers     : [],
                    });
                    newResponse.save(function(err, response) {
                        newRes = response;
                        switch (newRes.privacy) {
                            case "anonymous":
                                newRes.creatorID = "anonymous";
                                newRes.creatorUsername = "anonymous";
                            case "public":
                                const io = req.app.get('socketio');
                                io.emit("post", newRes);
                                break;
                            default:
                                break;
                        }
                        res.send(newRes);
                    });
                } else {
                    Response.findOneAndUpdate(
                        { _id: response._id },
                        {
                            content : req.body.content,
                            privacy : req.body.privacy
                        },
                        function(err, response) {
                            const editedResponse = response;
                            editedResponse.content = req.body.content;
                            editedResponse.privacy = req.body.privacy;
                            switch (editedResponse.privacy) {
                                case "anonymous":
                                    editedResponse.creatorID = "anonymous";
                                    editedResponse.creatorUsername = "anonymous";
                                case "public":
                                    const io = req.app.get('socketio');
                                    io.emit("edit", editedResponse);
                                    break;
                                default:
                                    break;
                            }
                            res.send(editedResponse);
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
        Response.findOne({
            _id: req.body.parent
        }, function(err, parent) {
            let i, upvoted = false;
            for (i=0; i<parent.upvoteUsers.length; i++) {
                if (parent.upvoteUsers[i] === req.user._id) {
                    upvoted = true;
                    break;
                }
            }
            if (upvoted && req.body.remove) {
                const userList = parent.upvoteUsers;
                userList.splice(i, 1);
                Response.findOneAndUpdate(
                    { _id: parent._id },
                    {
                        upvotes: userList.length,
                        upvoteUsers: userList
                    },
                    function(err, response) {
                        const editedResponse = response;
                        editedResponse.upvotes = userList.length;
                        editedResponse.upvoteUsers = userList;
                        const io = req.app.get('socketio');
                        io.emit("downvote", editedResponse);
                        res.send(editedResponse);
                    }
                );
            } else if (!upvoted && !req.body.remove) {
                Response.findOneAndUpdate(
                    { _id: parent._id },
                    {
                        upvotes: parent.upvoteUsers.length + 1,
                        upvoteUsers: parent.upvoteUsers.concat(req.user._id)
                    },
                    function(err, response) {
                        const editedResponse = response;
                        const io = req.app.get('socketio');
                        editedResponse.upvotes = parent.upvoteUsers.length + 1;
                        editedResponse.upvoteUsers = parent.upvoteUsers.concat(req.user._id);
                        io.emit("upvote", editedResponse);
                        res.send(editedResponse);
                    }
                );
            } else {
                res.send(parent);
            }
        });
    }
);

module.exports = router;