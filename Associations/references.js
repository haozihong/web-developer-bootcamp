var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

var Post = require("./models/post"),
	User = require("./models/user");

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher"
// });

Post.create({
	title: "How to cook the best burger pt. 4",
	content: "sadpoqiinzcxv982301298749"
}, (err, post) => {
	User.findOne({email: "bob@gmail.com"}, (err, foundUser) => {
		if (err) {
			console.log(err);
		} else {
			foundUser.posts.push(post);
			foundUser.save((err, data) => {
				if (err) {
					console.log(err);
				} else {
					console.log(data);
				}
			});
		}
	});
});

// User.findOne({name: "Bob Belcher"}).populate("posts").exec((err, user) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// User.findOne({name: "Bob Belcher"}, (err, user) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });