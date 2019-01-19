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

router.get('/questions', function(req, res) {
    Question.find({}, function(err, questions) {
        res.send(questions);
    })
})

router.get('/question', function(req, res) {
    Question.findOne({ question: req.query.question }, function(err, question) {
        res.send(question);
    })
})

router.get('/responses', function(req, res) {
    Response.find({}, function(err, responses) {
        res.send(responses);
    });
});

router.post(
    '/response',
    connect.ensureLoggedIn(),
    function(req, res) {
        const newResponse = new Response({
            creatorID       : req.user.googleID,
            creatorUsername : req.user.username,
            date            : 0,
            year            : 0, // TODO
            response        : req.body.response
        });
  
        newResponse.save(function(err, response) {
            User.findOne({ _id: req.user._id },function(err, user) {
                user.last_post = req.body.content;
                user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback. 
                // configure socketio
                const io = req.app.get('socketio');
                io.emit("post", { creator_id: story.id, creator_name: user.name, content: req.body.content });
            });
            if (err) console.log(err);
        });
        res.send({});
  }
);

router.post(
    '/upvote',
    connect.ensureLoggedIn(),
    function(req, res) {
        // req.body.parent
    }
);

module.exports = router;