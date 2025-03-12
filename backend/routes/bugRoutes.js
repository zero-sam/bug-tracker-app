const express = require("express");
const router = express.Router();
const Bug = require("../models/Bug");

// GET all bugs
router.get("/", async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST a new bug
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  try {
    const newBug = new Bug({
      title,
      description,
      status: "Open", // Default status when created
    });

    const bug = await newBug.save();
    res.json(bug);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE a bug
router.delete("/:id", async (req, res) => {
    try {
      const bug = await Bug.findByIdAndDelete(req.params.id);
      if (!bug) return res.status(404).json({ msg: "Bug not found" });
      res.json({ msg: "Bug deleted successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  

// PATCH: Update bug status
router.patch("/:id", async (req, res) => {
    const { status } = req.body;
  
    try {
      let bug = await Bug.findById(req.params.id);
      if (!bug) return res.status(404).json({ msg: "Bug not found" });
  
      bug.status = status;
      await bug.save();
  
      res.json({ msg: "Status updated", bug });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  

module.exports = router;
