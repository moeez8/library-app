const express = require("express");
const router = express.Router();
const purchaseRequestAPI = require("../api/purchaseRequest-api");

router.post("/", purchaseRequestAPI().addRequest);
router.get("/", purchaseRequestAPI().searchForRequest);
router.get("/:id", purchaseRequestAPI().getRequestByID);
router.put("/:id/close", purchaseRequestAPI().updateRequestByID);
router.put("/:id/fulfill", purchaseRequestAPI().fulfillRequestByID);
router.delete("/:id", purchaseRequestAPI().DeleteRequestByID);

export = router;
