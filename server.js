const express = require('express');
const bodyPraser = require('body-parser');
const request = require('request');
const url = require('url');
const logger = require('express-pino-logger')();

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(logger);
app.use(bodyPraser.urlencoded({ extended: false }));
app.use(bodyPraser.json());

app.listen(app.get('port'), function() {
  console.log('bot running on port: ', app.get('port'));
});

var users = [];

//routes
app.get('/api/sandwiches', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query["last clicked button name"];
  var message = "";

  if (query === "Yes, I did") {
    message = {
      "redirect_to_blocks": ["First salad question"],
      "messages": [
        {
          "text": "wow how about a salad"
        }
      ]
    }
  } else {
    message = {
      "redirect_to_blocks": ["First drinks question"],
      "messages": [
        {
          "text": "then drink something!!"
        }
      ]
    }
  }

  res.status(200).json(message);
});

app.get('/api/sandwiches/amount', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query["username"];

  users.push({
    "username": query["messenger user id"],
    "amountOfSandwiches": query["amountofsandwiches"]
  });

  const message = {

    "messages": [
      {
        "text": users
      }
    ]
  };
  res.status(200).json(message);
});

app.get('/api/welcome', function(req, res) {
  const message = {

    "messages": [
      {
        "text": "hello from the bot's BE application!!"
      }
    ]
  };
  res.status(200).json(message);
});

app.get('/', function(req, res) {
  res.send('Hi, Live and Let Pie bot here!');
});
