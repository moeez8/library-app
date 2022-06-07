const express = require("express");
const router = express.Router();
const { models } = require("../config/database");
const Sequelize = require("sequelize");

//Get All Tags
router.get("/", (req, res) => {
    models.tag
        .findAll()
        .then((tags) => {
            console.log(tags);
            res.send(tags);
        })
        .catch((err) => {
            console.log("Error: " + err);
            res.sendStatus(400);
        });
});


//Create New Tag
router.post("/", (req, res) => {
    const { tag } =
        req.body;

    models.tag
        .create({
            tag
        })
        .then(() => res.send("OK"))
        .catch((err) => {
            console.log("Error: " + err);
            res.sendStatus(400);
        });
});

module.exports = router;