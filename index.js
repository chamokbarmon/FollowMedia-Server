const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
app.use(cors());
app.use(express.json());
require("dotenv").config();

const Port = process.env.PORT || 5000;
// Mongodb Connect
const uri = `mongodb+srv://${process.env.REACT_USERNAME}:${process.env.REACT_DBPASSWORD}@cluster0.ojfpjwh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    // Collection create Start
    const MediaShow = client.db("Fellow").collection("FellowerAdd");
    //  collection end
  } catch (error) {
    console.log(error.name, error.message);
  }
}

run();
// Mongodb Connect end

// Create Post In MongoDb
app.post("/media", async (req, res) => {
  try {
    const result = await MediaShow.insertOne(req.body);
     
    if (result.insertedId) {
      res.send({
        success: true,
        message: `successfully created the ${req.body.name} post is created and your id ${result.insertedId} `,
      });
    } else {
      res.send({
        success: false,
        error: "couldn't create the post",
      });
    }
  } catch (error) {
    console.log(error.name, error.message);
    res.send({
      success: false,
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("server colse vaiya");
});

app.listen(Port, () => {
  console.log("server is running", Port);
});
