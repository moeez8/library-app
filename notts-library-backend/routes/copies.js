const express = require("express");
const router = express.Router();

//Get All Copies
router.get("/", (req, res) => {
  res.sendStatus(200);
});

//Add New Copy
router.post("/add", (req, res) => {
  res.sendStatus(200);
});

//Update A Copy
router.put("/:id", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
