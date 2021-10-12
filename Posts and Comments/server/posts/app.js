const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors());
const allPosts = {};

app.get("/posts", (req, res) => {
  res.send(allPosts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  req.body.id = id;
  allPosts[id] = req.body;
  console.log(allPosts);
  await axios
    .post("http://eventbus-serv:4005/events", {
      type: "Postcreated",
      data: allPosts[id],
    })
    .catch((e) => {
      console.log(e);
    });
  res.status(201).send(allPosts[id]);
});

app.post("/events", (req, res) => {
  console.log("This is posts event");
  res.send({ status: "OK" });
});

app.listen(4000, () => {
  console.log("The server has started at 4000");
});
