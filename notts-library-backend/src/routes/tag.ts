const express = require("express");
const router = express.Router();
const tagApi = require("../api/tag-api");

router.get("/", tagApi().getAllTags);
router.post("/", tagApi().createNewTag);

export = router;
