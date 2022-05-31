const express = require("express");
const router = express.Router();

//Get All Withdrawals
router.get("/", (req, res) => {
  res.sendStatus(200);
});

//Add New Withdrawal
router.post("/add", (req, res) => {
  res.sendStatus(200);
});

//Update A Withdrawal
router.put("/:id", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
