require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const axios = require("axios");

const app = express();
app.listen(process.env.PORT, function () {
  console.log("server started by app.js from newsletter project");
});
app.use("/static", express.static("./static/"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

 

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  };

  const jsonData = JSON.stringify(data);

  const url = process.env.MAILCHIP_URL;
  const options = {
    method: "POST",
    auth: `alicam:${process.env.API_KEY}`,
  };

  // const request = https.request(url, options, function (response) {
  //   response.on("data", function (data) {
  //     console.log(JSON.parse(data));
  //   });
  // });

  // request.write(jsonData);
  // request.end();

  // console.log(firstName, lastName, email);
  // res.send("sent");
  axios.post(url, data, {
      url: "/",
      method: "post",
      auth: {
        username: process.env.API_KEY,
        password: process.env.API_KEY,
      },
    })
    .then(
      (response) => {
        res.sendFile(__dirname + "/success.html");
      },
      (error) => {
        res.sendFile(__dirname + "/failure.html");
        // console.log(error);
        // res.send("fail");
      }
    );
});

app.post("/failure.html", function (req, res) {
  res.redirect("/");
});
