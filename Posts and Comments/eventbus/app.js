const express = require("express");
const axios = require("axios");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyparser.json());
app.use(cors());
app.post("/events", async (req, res) => {
  const event = req.body;
  console.log(req.body.type);
  await axios
    .post("http://posts-clusterip-serv:4000/events", {
      event,
    })
    .catch((e) => {
      console.log(e);
    });
  console.log("This is posts route");
  // await axios
  //   .post("http://localhost:3000/events", {
  //     event,
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // console.log("This is comments route");
  // await axios
  //   .post("http://localhost:4004/events", {
  //     event,
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // await axios
  //   .post("http://localhost:4001/events", {
  //     event,
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // console.log("This is query route");
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
