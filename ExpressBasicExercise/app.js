var express = require("express"),
	app = express();

app.get("/", (req, res) => {
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", (req, res) => {
	console.log("request to speak");
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!",
		cat: "I hate you human",
		fish: "..."
	}
	var animal = req.params.animal.toLowerCase();
	res.send("The " + animal + " says '" + sounds[animal] + "'");
	// switch (req.params.animal) {
	// 	case "pig":
	// 		res.send("The pig says 'Oink'");
	// 		break;
	// 	case "cow":
	// 		res.send("The cow says 'Moo'");
	// 		break;
	// 	case "dog":
	// 		res.send("The dog says 'Woof Woof!'");
	// }
});

app.get("/repeat/:msg/:num", (req, res) => {
	console.log("request to repeat");
	res.send(Array(Number(req.params.num)).fill(req.params.msg).join(" "));
});

app.get("*", (req, res) => {
	res.send("Sorry, page not found... What are you doing?");
});

app.listen(3000, function() {
	console.log("Server starts listening on port 3000");
});