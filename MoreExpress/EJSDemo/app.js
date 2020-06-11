var express = require("express"),
	app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
	// res.send("<h1>Welcome to the home page!</h1><h2>lalala</h2>");
});

app.get("/fallinlovewith/:thing", function(req, res) {
	var thing = req.params.thing;
	// res.send("You fall in love with " + thing);
	res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
	var posts = [
		{title: "Post 1", author: "Susy"},
		{title: "My adorable pet bunny", author: "Charlie"},
		{title: "Can you believe this pomsky?", author: "Colt"}
	];
	
	res.render("posts", {posts: posts});
});

app.listen(3000, _ => {
	console.log("Server starts listening on port 3000");
});