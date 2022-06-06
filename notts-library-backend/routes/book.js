const express = require("express");
const router = express.Router();
const { models } = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Search For Book
router.get("/", (req, res) => {
  const { term } = req.query;

  if (term) {
    models.book
      .findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: "%" + term + "%" } },
            { author: { [Op.like]: "%" + term + "%" } },
            { iban: { [Op.like]: "%" + term + "%" } },
            { category: { [Op.like]: "%" + term + "%" } },
            { type: { [Op.like]: "%" + term + "%" } },
          ],
        },
        include: [
          { model: models.copy, as: "copies" },
          {
            model: models.tag,
            as: "tags",
            through: {
              attributes: ["tag_id", "book_id"],
            },
          },
        ],
      })
      .then((books) => {
        console.log(books);
        res.send(books);
      })
      .catch((err) => {
        console.log("Error: " + err);
        res.sendStatus(400);
      });
  } else {
    models.book
      .findAll({
        include: [
          { model: models.copy, as: "copies" },
          {
            model: models.tag,
            as: "tags",
            through: {
              attributes: ["tag_id", "book_id"],
            },
          },
        ],
      })
      .then((books) => {
        console.log(books);
        res.send(books);
      })
      .catch((err) => {
        console.log("Error: " + err);
        res.sendStatus(400);
      });
  }
});

//Create New Book
router.post("/", (req, res) => {
  const { title, iban, author, type, category, cover_photo, description } =
    req.body;

  models.book
    .create({
      title,
      iban,
      author,
      type,
      category,
      cover_photo,
      description,
    })
    .then(() => res.send("OK"))
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
});

//Update A Book
router.put("/:id", (req, res) => {
  const { title, iban, author, type, category, cover_photo, desciption } =
    req.body;

  models.book
    .findByPk(parseInt(req.params.id))
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
  models.book
    .findByPk(parseInt(req.params.id), { incude: ["copies"] })
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
