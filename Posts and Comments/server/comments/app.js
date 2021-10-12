const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
app.use(bodyParser.json());
app.use(cors());

const comments = {};

app.post("/createComment", async (req, res) => {
  const postId = req.body.postId;
  const comment = req.body.comment;
  if (comments[postId] != undefined) {
    if (comments[postId].comment != undefined) {
      comments[postId].comment.push(comment);
    } else {
      comments[postId].comment = Array(comment);
    }
  } else {
    comments[postId] = { comment: Array(comment) };
  }
  await axios
    .post("http://localhost:4005/events", {
      type: "Comment created",
      data: { comment: comments[postId], id: postId, status: "pending" }
    })
    .catch((e) => {
      console.log(e);
    });
  res.status(201).send({ status: "the comment has been added" });
});

app.post("/allComments", (req, res) => {
  const postId = req.body.postId;
  res.send(comments[postId]);
});
app.post("/events", (req, res) => {
  console.log("This is comments event");
  res.send({ status: "OK" });
});

app.listen(3000, () => {
  console.log("The server has started at 3000");
});
