var thinky = require('thinky')({
  host: 'localhost',
  port: 28015,
  db: 'Test'
});

var r = thinky.r;
var type = thinky.type;

var User = thinky.createModel("User", {
  name: type.string(),
  email: type.string(),
  password: type.string()
});

exports.add = function (req, res) {
  var user = new User(req.body);

  user.save().then(function(result){
    res.json(result);
  }).error(function(err) {
    res.json({ message: err });
  });
};


module.exports = User;
