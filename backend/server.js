/* eslint-env node */

const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ==============================
   MIDDLEWARE
============================== */

app.use(express.json());
app.use(cors());

/* ==============================
   MONGODB CONFIG
============================== */

if (!uri) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}

const client = new MongoClient(uri);

const dbName = "Guard_BY_OM";

/* ==============================
   START SERVER
============================== */

async function startServer() {

  try {

    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("passwords");

    /* ==============================
       GET ALL PASSWORDS
    ============================== */

    app.get("/passwords", async (req, res) => {

      const data = await collection.find({}).toArray();

      res.json(data);

    });


    /* ==============================
       ADD PASSWORD
    ============================== */

    app.post("/passwords", async (req, res) => {

      const passwordData = req.body;

      const result = await collection.insertOne(passwordData);

      res.json({
        success: true,
        insertedId: result.insertedId
      });

    });


    /* ==============================
       DELETE PASSWORD
    ============================== */

    app.delete("/passwords/:id", async (req, res) => {

      const id = req.params.id;

      const result = await collection.deleteOne({
        _id: new ObjectId(id)
      });

      res.json({
        success: true,
        deletedCount: result.deletedCount
      });

    });


    /* ==============================
       UPDATE PASSWORD (EDIT)
    ============================== */

    app.put("/passwords/:id", async (req, res) => {

      const id = req.params.id;

      const updatedData = req.body;

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );

      res.json({
        success: true,
        modifiedCount: result.modifiedCount
      });

    });


    /* ==============================
       START EXPRESS SERVER
    ============================== */

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {

      console.log(`Server running at ${PORT}`);

    });

  } catch (error) {

    console.error("MongoDB connection error:", error);

  }

}

startServer();