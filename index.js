// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", function (req, res) {
  let inputDate
  // see if input is a number or not
  let userInput;
  if (!isNaN(req.params.date)) {
    userInput = parseInt(req.params.date);
  } else {
    userInput = req.params.date;
  }

  if (new Date(userInput).toString() == 'Invalid Date') {
    res.json({
      error: 'Invalid Date'
    })
  } else {
    const timeNow = new Date(userInput);
    res.json({
      unix: timeNow.getTime(),
      utc: timeNow.toUTCString()
    });
  }


});

app.get("/api", function (req, res) {
  const timeNow = new Date();
  res.json({
    unix: timeNow.getTime(),
    utc: timeNow.toUTCString()
  });
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
