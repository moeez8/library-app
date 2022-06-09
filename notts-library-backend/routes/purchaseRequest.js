const express = require("express");
const router = express.Router();
const purchaseRequestAPI = require("../api/purchaseRequest-api")

router.get("/", purchaseRequestAPI().getAllRequests);
router.post("/", purchaseRequestAPI().addRequest);

//Update A Purchase Request (currently fulfills the request)
router.put("/:id", purchaseRequestAPI().updateRequest);

module.exports = router;
