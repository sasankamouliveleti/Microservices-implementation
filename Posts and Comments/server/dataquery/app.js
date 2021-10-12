const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.post("/events", (req, res) => {
  console.log("this is query event");
  const { type, data } = req.body.event;
  if (type == "Postcreated") {
    posts[data.id] = {
      id: data.id,
      title: data.title,
    };
  } else if (type == "Comment created") {
    posts[data.id] = { ...posts[data.id], ...data.comment };
  }
  res.send({ status: "Ojkk" });
});
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.listen(4001, () => {
  console.log("The server has started at 4001");
});
