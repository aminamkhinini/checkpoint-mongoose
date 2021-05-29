const express = require("express");
const mongoose = require("mongoose");

const app = express();

//create database with server
mongoURI="mongodb+srv://amina:amina2020@cluster0.j2eeg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    err ? console.log(err) : console.log("database is connected");
  }
);

// parse the data
app.use(express.json());
app.use("/persons", require("./Routes/personRoutes"));
const port = 5000;

app.listen(port, (err) => {
  err ? console.log(err) : console.log("the server is running in port 5000");
});
