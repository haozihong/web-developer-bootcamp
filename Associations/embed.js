var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// Post - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

// User - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


// var newUser = new User({
// 	email: "hermione@hogwarts.edu",
// 	name: "Hermione Granger"
	
// });

// newUser.posts.push({
// 	title: "How to bre polyjuice potion",
// 	content: "Just kidding. Go to potions class to learn it!"
// });

// newUser.save((err, user) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// })

// var newPost = new Post({
// 	title: "Reflections on Apple",
// 	content: "They are delicious"
// });

// newPost.save((err, post) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

User.findOne({name: "Hermione Granger"}, (err, user) => {
	if (err) {
		console.log(err);
	} else {
		user.posts.push({
			title: "Three things i really hate",
			content: "Voldemort. Voldemort. Voldmort."
		});
		user.save((err, user) => {
			if (err) {
				console.log(err);
				
			} else {
				console.log(user);
			}
		});
	}
});