const express = require("express");
const router = express.Router();
const { models } = require("../config/database");
const Sequelize = require("sequelize");

//Create New Tag
router.post("/", (req, res) => {
    const { tag_id, book_id } =
        req.body;

    models.tag
        .create({
            book_id,
            tag_id
        })
        .then(() => res.send("OK"))
        .catch((err) => {
            console.log("Error: " + err);
            res.sendStatus(400);
        });
});

module.exports = router;