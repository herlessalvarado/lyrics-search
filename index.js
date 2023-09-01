const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const port = 3000;

const uri =
  "mongodb+srv://software-2:EDNiZtTVZ4PUWQJ2@cluster0.zoklxgh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const database = client.db("software-2");
const music = database.collection("music");

app.get("/", async (req, res) => {
  const output = await music.findOne({ song: req.query.song });
  res.send(output.text);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
