const express = require("express");
const router = express.Router();
// const Withdraw = require("../models/Withdraw");
const { models } = require('../config/database')

//Get All Withdraws
router.get("/", (req, res) => {
  models.withdraw.findAll()
    .then((withdraws) => {
      console.log(withdraws);
      res.send(withdraws);
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
});

//Add New Withdraw
router.post("/add", (req, res) => {
  let { copy_id, user_name } = req.body;

  models.withdraw.create({
    copy_id,
    date_out: new Date(),
    user_name,
  })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
});

//Get A Withdraw By ID
router.get("/:id", (req, res) => {
  models.withdraw.findByPk(parseInt(req.params.id))
    .then((row) => {
      if (row) {
        res.send(row);
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
});

//Update A Withdraw By ID
router.put("/:id", (req, res) => {
  models.withdraw.findByPk(parseInt(req.params.id))
    .then((row) => {
      if (row) {
        row.update({ date_in: new Date() });
        res.send(row);
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
});

module.exports = router;
