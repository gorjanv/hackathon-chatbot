const express = require('express');
const bodyPraser = require('body-parser');
const request = require('request');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyPraser.urlencoded({ extended: false }));
app.use(bodyPraser.json());

app.listen(app.get('port'), function() {
  console.log('bot running on port: ', app.get('port'));
});

//routes
app.get('/api/welcome', function(req, res) {
  debugger;
  const message = {
    "messages": [
      {
        "text": "hello from the bot's BE application!!"
      }
    ]
  };
  res.send(JSON.stringify(message));
});

app.get('/', function(req, res) {
  res.send('Hi, Live and Let Pie bot here!');
});
