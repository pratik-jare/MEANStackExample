const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://Pratik_jare:PR@tik148@cluster0-1guyh.mongodb.net/Mean-Stack-Example?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('connected to Database !');
  })
  .catch(() => {
    console.log('Connection Failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((document) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: document
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Posts deleted successfully!" });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Updated Succesful!' });
  })
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'post not found' });
    }
  })
})

module.exports = app;


// mongo compass connection command
// mongo "mongodb+srv://cluster0-1guyh.mongodb.net/Mean-Stack-Example" --username Pratik_jare

// change db using command in that -> use <dbname>
//  help 
