// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const Question = require('../models/question');
const Response = require('../models/response');
const User = require('../models/user');

const router = express.Router();

// api endpoints
router.get('/test', function(req, res) {
    res.send('reeeee');
});

router.get('/whoami', function(req, res) {
    if(req.isAuthenticated()) {
        res.send(req.user);
    }
    else {
        res.send({});
    }
});

router.get('/user', function(req, res) {
    User.findOne({ _id: req.query._id }, function(err, user) {
        res.send(user);
    });
});

router.post('/user', function(req, res) {
    const updatedUser = {};

    if (req.name) updatedUser.name = req.body.name;
    if (req.username) updatedUser.username = req.body.username;
    if (req.timeZone) updatedUser.timeZone = req.body.timeZone;
    if (req.privacy) updatedUser.defaultPrivacy = req.body.privacy;

    User.findOneAndUpdate({ _id: req.body.id }, updatedUser, function(err, user) {
        res.send({});
    });
});

router.get('/questions', function(req, res) {
    Question.find({}, function(err, questions) {
        res.send(questions);
    })
});

router.get('/responses', function(req, res) {
    Response.find({ date: req.query.date }, function(err, responses) {
        res.send(responses);
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
            date            : 0,
            year            : 0, // TODO
            content         : req.body.content,
            upvotes         : 0
        });
        
        // TODO keep?
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
        Response.findOneAndUpdate({ _id: req.body.parent._id }, { upvotes: req.body.parent.upvotes + 1 }, function(err, user) {
            const io = req.app.get('socketio');
            io.emit("upvote", response);
        });
        res.send({});
    }
);

module.exports = router;