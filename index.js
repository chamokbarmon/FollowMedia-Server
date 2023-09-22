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


// Collection create Start
const MediaShow = client.db("Fellow").collection("FellowerAdd");
//  collection end
async function run() {
  try {
    await client.connect();
 
  } catch (error) {
    console.log(error.name, error.message);
  }
}

run();
// Mongodb Connect end

// Create Post In MongoDb
app.post("/media", async (req, res) => {
  console.log(req.body)
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


// get in mongodb
app.get("/mediaShow",async(req,res)=>{
  try {
    const cursor = MediaShow.find({})
    const result = await cursor.toArray()
     res.send({
      success:true,
      message:"successfully got the data",    
      data:result

     })
  } catch (error) {
    console.log(error.name,error.message);
    res.send({
       success:false,
       error:error.message
    })
  }


})

app.get("/", (req, res) => {
  res.send("server colse vaiya ami tik ase");
});

app.listen(Port, () => {
  console.log("server is running", Port);
});
