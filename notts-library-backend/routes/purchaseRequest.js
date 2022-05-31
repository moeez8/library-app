const express = require("express");
const router = express.Router();

//Get All Purchase Requests
router.get("/", (req, res) => {
  res.sendStatus(200);
});

//Add New Purchase Request
router.post("/add", (req, res) => {
  res.sendStatus(200);
});

//Update A Prurchase Request
router.put("/:id", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
