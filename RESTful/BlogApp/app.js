var express = require("express"),
	app = express(),
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	expressSanitizer = require("express-sanitizer");

//app config
mongoose.connect("mongodb://localhost:27017/blog_app", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//mongoose/model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	create: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//restful routes
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

//Index route
app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	})
});

//New route
app.get("/blogs/new", (req, res) => {
	res.render("new");
});

//Create route
app.post("/blogs", (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, (err, blog) => {
		if (err) {
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

//Show route
app.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

//Edit route
app.get("/blogs/:id/edit", (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

//Update route
app.put("/blogs/:id", (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
});

//Delete route
app.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, _ => {
	console.log("BlogApp server started");
})