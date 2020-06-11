var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res) {
	res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
	res.send("Goodbye");
});
// "dog" => "MEOW!"
app.get("/dog", function(req, res) {
	console.log("someone made a request to /dog!!");
	res.send("MEOW!!");
});

// route parameter
app.get("/r/:subredditName", function(req, res) {
	res.send("WELCOME TO THE " + req.params.subredditName.toUpperCase() + " SUBREDDIT!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
	console.log(req.params);
	res.send("WELCOME TO THE COMMENTS PAGE!");
});

// This have to be at bottom. Order matters
app.get("*", function(req, res) {
	res.send("YOU ARE A STAR!!!");
});

// Tell express to listen for requests (start server)
app.listen(3000, function () {
	console.log("Server has started on Port 3000");
});