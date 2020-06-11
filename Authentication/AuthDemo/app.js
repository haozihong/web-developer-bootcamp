const express = require('express'),
	  app = express(),
	  mongoose = require('mongoose'),
	  passport = require('passport'),
	  bodyParser = require('body-parser'),
	  LocalStrategy = require('passport-local'),
	  passportLocalMongoose = require('passport-local-mongoose'),
	  User = require("./models/user");

mongoose.connect('mongodb://localhost:27017/auth_demo', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});
app.use(require("express-session")({
	secret: "secret114514",
	resave: false,
	saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======================
//  ROUTES
// ======================

//home page
app.get('/', (req, res) => {
	res.render('home');
});

//secret page
app.get('/secret', loggedOutRedirect("/login"), (req, res) => {
	res.render('secret');
});

//Authentication routes
app.get("/register", (req, res) => {
	res.render("register");
});

app.post("/register", (req, res) => {
	console.log(req.body);
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, () => {
			if (err) {
				console.log(err);
				return;
			}
			res.redirect("/secret");
		});
	});
});

//login routes
//render login form
app.get("/login", loggedOutRedirect("/secret", true), (req, res) => {
	res.render("login");
});

//login logic
//middleware
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,(req, res) => {
	
});

//logout 
app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

function loggedOutRedirect(redirectRoute, reverse=false) {
	return (req, res, next) => {
		if (reverse != req.isAuthenticated()) {
			next();
		} else {
			res.redirect(redirectRoute);
		}
	}
}

app.listen(3000, _ => {
	console.log('server started');
});