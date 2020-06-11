var express = require("express"),
	app = express(),
	bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/friends", (req, res) => {
	res.render("friends", {friends: friends});
});

app.post("/addfriend", (req, res) => {
	friends.push(req.body.newfriend);
	res.redirect("/friends");
});

app.listen(3000, _ => {
	console.log("server started");
});