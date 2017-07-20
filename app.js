var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var smtpTrans = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: "",
      pass: ""
  }
});

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/express-master';
mongoose.connect(mongoDB);
var db = mongoose.connection;
console.log(db);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

app.set('view engine', 'pug');

app.use('/assets',express.static('assets'));

app.get('/', function (req, res) {
    res.render(
        'index',{ title: 'Hey Hey Hey!', message: 'Yo Yo'})
})

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})
