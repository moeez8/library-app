const express = require("express");
const router = express.Router();
const purchaseRequestAPI = require("../api/purchaseRequest-api");



router.post("/", purchaseRequestAPI().addRequest);
router.get("/", purchaseRequestAPI().searchForRequest);
router.get("/:id", purchaseRequestAPI().getRequestByID);
router.put("/:id", purchaseRequestAPI().updateRequestByID);

router.delete("/:id", purchaseRequestAPI().deleteBookById);

export = router;


// router.get("/", bookApi().searchForBook);
// router.post("/", bookApi().createNewBook);
// router.put("/:id", bookApi().updateBookById);
// router.get("/:id", bookApi().getBookById);
// router.get("/:id/tags", bookApi().getTagsByBookId);
// router.delete("/:id", bookApi().deleteBookById);
