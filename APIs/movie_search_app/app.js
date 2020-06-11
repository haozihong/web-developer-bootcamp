const app = require("express")(),
	  request = require("request");
require("locus");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("search");
});

app.get("/results", (req, res) => {
	console.log(req.query.search_key);
	request(`http://www.omdbapi.com/?apikey=thewdb&s=${req.query.search_key}`, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.render("results", {data: data});
		}
	});
});


app.listen(3000, _ => {
	console.log("server has started");
});