const express = require("express");
const router = express.Router();
const db = require("../config/database")
const Book = require("../models/Book");
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

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

//Search For Book
router.get('/search', (req, res) => {
  const { term } = req.query;

  Book.findAll({ where: { title: { [Op.like]: '%' + term + '%' } } })
    .then((books) => {
      console.log(books);
      res.send(books);
    })
})

//Add New Book
router.post("/add", (req, res) => {
  const { title, iban, author, type, category, cover_photo, desciption } =
    req.body;

  Book.create({
    title,
    iban,
    author,
    type,
    category,
    cover_photo,
    desciption,
  })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
})

//Update A Book
router.put("/:id", (req, res) => {
  if (req.params.id) {
    console.log(req.params.id);
    res.sendStatus(200);
  }
  res.sendStatus(405);
});

//Get Book By Id
router.get("/:id", (req, res) => {
  Book.findAll()
    .then((books) => {
      const result = books.filter(
        (book) => book.id === parseInt(req.params.id)
      );
      res.send(result);
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
});

module.exports = router;
