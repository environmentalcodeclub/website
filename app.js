var express = require('express');
var app = express();
var morgan = require('morgan');
var request = require('request-promise');

var Cache = {};

// get all members from meetup API
request.get({
  url: 'https://api.meetup.com/environmentalcodeclub/members?&sign=true&key=' + process.env.MEETUP_API_KEY,
  json: true
}).then(function(data) {
  Cache['members'] = data;
}).catch(function(err) {
  console.log(err);
});

// get all events from meetup API
request.get({
  url: 'https://api.meetup.com/environmentalcodeclub/events?&sign=true&key=' + process.env.MEETUP_API_KEY,
  json: true
}).then(function(data) {
  Cache['events'] = data;
}).catch(function(err) {
  console.log(err);
});

app.get('/members', function(req, res) {
  res.status(200).json(Cache['members']);
});

app.get('/events', function(req, res) {
  res.status(200).json(Cache['events']);
});


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8000, function() {
  console.log("Express is listening...");
});