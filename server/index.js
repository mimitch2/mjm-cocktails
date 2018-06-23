// const path = require('path');
require("dotenv").config();
const mongoose = require("mongoose");
// const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors())


mongoose.set("debug", true);
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://mimitch:Bladerunner80@ds133550.mlab.com:33550/cocktails");

mongoose.connect(process.env.mongodburi).then(
  () => { 
    console.log("mongoose connected successfully");
   
    // startWebServer();
  },
  err => {
    console.log("mongoose did not connect",err);
  }
);


const FavoriteRoutes = require ("./routes/FavoriteRoutes")
app.use(FavoriteRoutes)
const DrinksRoutes = require ("./routes/DrinksRoutes")
app.use(DrinksRoutes)
// app.use(express.static("public"));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/public/index.html'));
// });

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const port = process.env.PORT || 3001;
app.listen(port, (err) => {
  if (err) {
    return console.log("Error", err);
  } 
  console.log("Web server is now running on port " + port);
});


// <-----------handle bad request------------->
app.use(function (request,response) {
  response.send("NOPE!!!!");
});