const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const comments = req.body.comments;
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].includes("apples")) {
      comments[i] = "You cannnot show this comment";
    }
  }
});

app.listen(4004, () => {
  console.log("The moderator server has started at port 4004");
});
