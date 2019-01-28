// libraries
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
require('dotenv').config();

// local dependencies
const db = require('./db');
const passport = require('./passport');
const api = require('./routes/api');

// initialize express app
const app = express();
const publicPath = path.resolve(__dirname, '..', 'client/dist');

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up sessions
app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

// test routes
app.get(["/t"], (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"))
})

// authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/login' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/'); 
});

// api route
app.use('/api', api);
app.use(express.static(publicPath));

// 404 route
app.use(function(req, res, next) {
  res.status = 404;

  // respond with html
  if (req.accepts('html')) {
    res.sendFile(path.join(publicPath, "404.html"))
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// route error handler
app.use(function(err, req, res, next) {
  res.status = (500 || err.status);

  // respond with html
  if (req.accepts('html')) {
    res.sendFile(path.join(publicPath, "500.html"))
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Something went wrong.' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Something went wrong.');
});

// port config
const port = (process.env.PORT || 3000); // config variable
const server = http.Server(app);

// socket stuff
const io = socketio(server);
app.set('socketio', io);

server.listen(port, function() {
  console.log('Server running on port: ' + port);
});