const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");

app.use(express.json());
app.use(cors());

const uri ="mongodb+srv://nihithirpara06:fLPPf7FrDibXu93o@cluster0.vfijyp3.mongodb.net/users";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.post("/saveFormData", (req, res) => {
  const formData = req.body;

  const db = client.db();
  const collection = db.collection("users");

  collection
    .insertOne(formData)
    .then((result) => {
      const insertedId = result.insertedId;
      console.log(formData);
      console.log(result);
      const savedDataWithId = { ...formData, _id: insertedId.toString() };
      res.status(200).json(savedDataWithId);
    })
    .catch((err) => {
      console.error("Error saving form data:", err);
      res.status(500).send("Error saving form data");
    });
});

app.get("/getFormData", (req, res) => {
  const db = client.db();
  const collection = db.collection("users");

  collection
    .find()
    .toArray()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Error retrieving form data:", err);
      res.status(500).send("Error retrieving form data");
    });
});

app.listen(3000, () => {
  console.log("Backend server is running on port 3000");
});
