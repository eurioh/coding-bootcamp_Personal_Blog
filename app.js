//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit";
const aboutContent = "Hac habitasse platea dictumst vestibulum";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien";

const app = express();



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

let postsArray = [];

app.get("/", function (req, res) {
    res.render("home", {
        startingContent: homeStartingContent,
        posts: postsArray
    });
    console.log(postsArray);
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

    const post = {
        title: text,
        content: contentText
    };

    // for (var i = 0; i < posts.length(); i++) {
    //     // post=[i];

    // }

    postsArray.push(post);
    res.redirect("/");

});

app.get("/posts/:postName", function (req, res) {
    const requesedTitle = _.lowerCase(req.params.postName);


    postsArray.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);
    

        if (storedTitle === requesedTitle) {
           
            res.render("post", {
                postTitle: post.title,
                postContent: post.content 

            });
        }
    });

    
});



app.listen(3000, function () {
    console.log("Server started on port 3000");
});