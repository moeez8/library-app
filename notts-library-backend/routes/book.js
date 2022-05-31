const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Book = require("../models/Book");
const Sequelize = require("sequelize");
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
router.get("/search", (req, res) => {
  const { term } = req.query;

  Book.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: "%" + term + "%" } },
        { author: { [Op.like]: "%" + term + "%" } },
        { iban: { [Op.like]: "%" + term + "%" } },
        { categroy: { [Op.like]: "%" + term + "%" } },
        { type: { [Op.like]: "%" + term + "%" } },
      ],
    },
  }).then((books) => {
    console.log(books);
    res.send(books);
  });
});

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
});

//Update A Book
router.put("/:id", (req, res) => {
  const { title, iban, author, type, category, cover_photo, desciption } =
    req.body;

  Book.findByPk(parseInt(req.params.id))
    .then((row) => {
      if (row) {
        row.update({
          title: title || row.title,
          iban: iban || row.iban,
          author: author || row.author,
          type: type || row.type,
          category: category || row.category,
          cover_photo: cover_photo || row.cover_photo,
          desciption: desciption || row.desciption,
        });
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

//Get Book By Id
router.get("/:id", (req, res) => {
  Book.findByPk(parseInt(req.params.id))
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

module.exports = router;
