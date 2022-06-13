const express = require("express");
const router = express.Router();
const purchaseRequestAPI = require("../api/purchaseRequest-api");

router.get("/", purchaseRequestAPI().getAllRequests);
router.post("/", purchaseRequestAPI().addRequest);
router.put("/:id", purchaseRequestAPI().updateRequest);

export = router;
