const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bugRoutes = require("./routes/bugRoutes");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Setup Express server
const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Added PATCH
      allowedHeaders: ["Content-Type"],
    })
  );
  
  

// Routes
app.use("/api/bugs", bugRoutes);


app.delete("/bug/:id", async (req, res) => {
    try {
      await Bug.findByIdAndDelete(req.params.id);
      res.json({ message: "Bug deleted successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete bug" });
    }
  });
  app.put("/bug/:id/status", async (req, res) => {
    try {
      const bug = await Bug.findById(req.params.id);
      bug.status = bug.status === "Open" ? "Resolved" : "Open";
      await bug.save();
      res.json({ message: "Status updated!", status: bug.status });
    } catch (err) {
      res.status(500).json({ error: "Failed to update status" });
    }
  });
  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
