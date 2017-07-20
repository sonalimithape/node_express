var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema( {
          username: String,
          password: String,
          email :String
      }); 
var User = mongoose.model('user', userSchema);

module.exports.add = function(data){
  var newUser = User({
    username: data.username,
    password: data.password,
    email:data.email
});

var msg;
newUser.save(function (err, user) {
    if (err){
      console.log(err);
      msg= "error";
    } else {
      msg = "success";
    }
  });
  return msg;
};

module.exports.login = function (data,callback) {
  var msg;
      console.log(data);
  User.findOne({username: data.username}, function(err, user) {
    if (err) {
      callback(err, null);
    }
    else{
      callback(null,user);
    }
  });
};
