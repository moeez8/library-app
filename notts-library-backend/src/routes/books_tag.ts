const express = require("express");
const router = express.Router();
const NewBooksTagApi = require("../api/books-tag-api");

router.get("/", NewBooksTagApi().GetAllBooksTags);
router.post("/", NewBooksTagApi().CreateNewBooksTag);

export = router;
