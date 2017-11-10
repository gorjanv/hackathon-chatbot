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
  var query = url_parts.query;
  var userDoesntExist = true;

  var newUsers = users.map(function(user) {
    if (user.hasOwnProperty("username")) {
      if (user.username === query["messenger user id"]) {
        user["amountOfSandwiches"] = query["amountofsandwiches"];
        userDoesntExist = false;
      }
    }
    return user;
  });

  if(userDoesntExist) {
    users.push({
      "username": query["messenger user id"],
      "amountOfSandwiches": query["amountofsandwiches"],
      "cheese": [],
      "meat": [],
      "salad": [],
      "spread": []
    });
  } else {
    users = newUsers;
  }

  const message = {
    "redirect_to_blocks": ["What did you have on your sandwich?"]
  };
  res.status(200).json(message);
});

app.get('/api/sandwiches/cheese', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var newUsers = users.map(function(user) {
    if (user.hasOwnProperty("username")) {
      if (user.username === query["messenger user id"]) {
        user["cheese"].push(query["typeofcheese"]);
      }
    }
    return user;
  });

  users = newUsers;

  const message = {
    // "redirect_to_blocks": ["What did you have on your sandwich?"],
    "messages": [
      {
        "text": JSON.stringify(users)
      }
    ]
  };
  res.status(200).json(message);
});

app.get('/api/sandwiches/meat', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var newUsers = users.map(function(user) {
    if (user.hasOwnProperty("username")) {
      if (user.username === query["messenger user id"]) {
        user["meat"].push(query["typeofmeat"]);
      }
    }
    return user;
  });

  users = newUsers;

  const message = {
    // "redirect_to_blocks": ["What did you have on your sandwich?"],
    "messages": [
      {
        "text": JSON.stringify(users)
      }
    ]
  };
  res.status(200).json(message);
});

app.get('/api/sandwiches/salad', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var newUsers = users.map(function(user) {
    if (user.hasOwnProperty("username")) {
      if (user.username === query["messenger user id"]) {
        user["salad"].push(query["typeofsalad"]);
      }
    }
    return user;
  });

  users = newUsers;

  const message = {
    // "redirect_to_blocks": ["What did you have on your sandwich?"],
    "messages": [
      {
        "text": JSON.stringify(users)
      }
    ]
  };
  res.status(200).json(message);
});

app.get('/api/sandwiches/spread', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var newUsers = users.map(function(user) {
    if (user.hasOwnProperty("username")) {
      if (user.username === query["messenger user id"]) {
        user["spread"].push(query["typeofspread"]);
      }
    }
    return user;
  });

  users = newUsers;

  const message = {
    // "redirect_to_blocks": ["What did you have on your sandwich?"],
    "messages": [
      {
        "text": JSON.stringify(users)
      }
    ]
  };
  res.status(200).json(message);
});

app.get('/api/statistics', function(req, res) {
  var meat = 0;
  var cheese = 0;
  var spread = 0;
  var salad = 0;

  users.forEach(function(user) {
    cheese += cheese.length;
    spread += spread.length;
    meat += meat.length;
    salad += salad.length;
  });

  const numberOfUsers = "Number of users that intereacted with the bot: " + users.length;
  const numberOfCheeseSlices = "Number of cheese slices eaten today: " + cheese.toString();
  const numberOfMeatSlices = "Number of meat slices eaten today: " + meat.toString();
  const numberOfSalads = "Number of salads eaten today: " + salad.toString();
  const numberOfSpreads = "Number of spreads eaten today: " + spread.toString();

  const message = {
    // "redirect_to_blocks": ["What did you have on your sandwich?"],
    "messages": [
      {
        "text": numberOfUsers
      },
      {
        "text": numberOfCheeseSlices
      },
      {
        "text": numberOfMeatSlices
      },
      {
        "text": numberOfSalads
      },
      {
        "text": numberOfSpreads
      },
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
