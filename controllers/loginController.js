var mongoose = require('mongoose');
var user = require('../models/user');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var smtpTrans = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: "",
      pass: ""
  }
});

module.exports.controller = function (app) {

  app.get('/login', function (req, res) {
    var data = {msg :"" };
    res.render('login',{data:data});
  });

  app.get('/signup', function (req, res) {
    var data = {msg :"" };
    res.render('signup',{data:data});
  });

  app.post('/login',urlencodedParser,function(req,res,next){
      var data = req.body;
      var res_data = user.login(data,function(err,user){
        if(err == null && user == null){
          var data = {msg :"incorrect login or pwd" };
          res.render('login',{data:data});
        }else if (user==null) {
          var data = {msg :err };
          res.render('login',{data:data});
        }else {
          res.redirect('/');
        }
      });
  });

  app.post('/signup',urlencodedParser,function(req,res){
      var data = req.body;
      var response = user.add(data);
      console.log(response);
      if(response == 'error'){
        var data = {msg:'error'};
        res.render('signup',{data:data});
      }else{
        var email = data.email;
        var msgbody = "Thank You "+email+", You are registered successfully";
        var mailOpts = {
            from: '', //your email
            to: email,
            subject: 'Account verification',
            text: msgbody
        };
        smtpTrans.sendMail(mailOpts, function (error, response) {
            //Email not sent
            if (error) {
              console.log(error);
            }
            //Yay!! Email sent
            else {
              console.log("successfully sent");
            }
        });
        var data = {msg:'success'};
        res.render('signup',{data:data});
      }
  });
}
