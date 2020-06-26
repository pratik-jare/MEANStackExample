const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require('./routes/posts');

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

app.use("/api/posts", postsRoutes);

module.exports = app;


// mongo compass connection command
// mongo "mongodb+srv://cluster0-1guyh.mongodb.net/Mean-Stack-Example" --username Pratik_jare

// change db using command in that -> use <dbname>
//  help 
