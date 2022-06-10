const express = require("express");
const router = express.Router();
const bookApi = require("../api/book-api");

router.get("/", bookApi().searchForBook);
router.post("/", bookApi().createNewBook);
router.put("/:id", bookApi().updateBookById);
router.get("/:id", bookApi().getBookById);
router.get("/:id/copies", bookApi().getCopiesByBookId);
router.get("/:id/tags", bookApi().getTagsByBookId);
router.delete("/:id", bookApi().deleteBookById);

module.exports = router;
