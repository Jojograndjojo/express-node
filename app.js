var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var passport = require("passport");
var passportLocal = require("passport-local");


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function(username, password, done) {
  // User.find({}) or something, if I was using a database
  if ( username === password ) {
    done(null, { id: username, name: username });
  } else {
    done(null, null);
  }
}));

passport.serializeUser(function(user, done) {
  done(null,user.id);
});

passport.deserializeUser(function(id, done) {
  //Query database here
  done(null,{id: id, name: id})
});

app.get("/", function(req, res) {
  res.render("index.ejs", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
  });
});

app.get("/login", function(req, res) {
  res.render("login.ejs");
});

app.post("/login", passport.authenticate('local'), function(req, res) {
  res.redirect("/");
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

var port = process.env.PORT || 1337;

app.listen(port, function() {
  console.log("http://127.0.0.1:" + port + "/");
});
