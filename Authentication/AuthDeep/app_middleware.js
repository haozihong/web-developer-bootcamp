const express = require("express"),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  sessions = require("client-sessions"),
	  bcrypt = require("bcryptjs");
let app = express();

mongoose.connect("mongodb://localhost:27017/ss-auth", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});
let User = mongoose.model("User", new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true}
}));

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessions({
	cookieName: "session",
	secret: "wasfhsapis",
	duration: 30 * 60 * 1000
}));

app.use((req, res, next) => {
	if (!(req.sesion && req.session.userId)) return next();
	User.findById(req.session.userId, (err, user) => {
		if (err) return next();
		if (!user) return next();
		
		user.password = undefined;
		
		req.user = user;
		req.locals.user = user;
		
		next();
	});
});

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/register", (req, res) =>{
	res.render("register");
});

app.post("/register", (req, res) => {
	let hash = bcrypt.hashSync(req.body.password, 14);
	req.body.password = hash;
	let user = new User(req.body);
	
	user.save((err, user) => {
		if (err) {
			let error = err.code !== 11000 ?
				"Something bad happened! Please try again." : 
				"That email is already taken, please try another.";
			return res.render("register", { error: error})
		}
		req.session.userId = user._id;
		res.redirect("/dashboard");
	});
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err || !user || !bcrypt.compareSync(req.body.password, user.password)) {
			return res.render("login", {
				error: "Incorrect email / password."
			});
		}
		
		req.session.userId = user._id;
		res.redirect("/dashboard");
	});
})

app.get("/dashboard", loginRequired, (req, res) => {
	res.render("dashboard");
});

function loginRequired(req, res, next) {
	if (!req.user) return res.redirect("/login");
	next();
}

app.listen(3000, _ => {
	console.log("server started");
});