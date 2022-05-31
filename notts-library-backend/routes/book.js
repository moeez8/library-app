const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/", (req, res) => {
  Book.findAll()
    .then((books) => {
      console.log(books);
      res.send(books);
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.status(400);
    });
});

router.get("/add", (req, res) => {
  Book.create({
    title: "bestbook",
  })
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
});

module.exports = router;
