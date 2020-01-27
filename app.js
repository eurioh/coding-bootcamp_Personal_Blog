//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit";
const aboutContent = "Hac habitasse platea dictumst vestibulum";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/blogDB", {
    useUnifiedTopology: true
});

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
    Post.find({}, function(err, posts){
        res.render("home", {
            startingContent: homeStartingContent,
            posts: posts
        });    
    });
});

app.get("/about", function (req, res) {
    res.render("about", {
        aboutContent: aboutContent
    });
});

app.get("/contact", function (req, res) {
    res.render("contact", {
        contactContent: contactContent
    });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {

    let text = req.body.postTitle;
    let contentText = req.body.postContent;

    const post = new Post({
        title: text,
        content: contentText
    });

    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
});

app.get("/posts/:postName", function (req, res) {
    const requesedTitle = _.lowerCase(req.params.postName);

    Post.findOne({_id: requesedTitle}, function (err, post) {
        res.render("post", {
            postTitle: post.title,
            postContent: post.content
        });
    });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});