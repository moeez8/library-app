const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

//Get All Books
router.get("/", (req, res) => {
  Book.findAll()
    .then((books) => {
      console.log(books);
      res.send(books);
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
});

//Get Book By Id
router.get("/:id", (req, res) => {
  if (req.params.id) {
    console.log(req.params.id);
    res.sendStatus(200);
  }
  res.sendStatus(405);
});

//Search For Book
router.get("/search", (req, res) => {
  const { term } = req.query;
  console.log(term);
  res.sendStatus(200);
});

//Add New Book
router.post("/add", (req, res) => {
  Book.create({
    title: "bestbook",
  })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

//Update A Book
router.put("/:id", (req, res) => {
  if (req.params.id) {
    console.log(req.params.id);
    res.sendStatus(200);
  }
  res.sendStatus(405);
});

module.exports = router;
