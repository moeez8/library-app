const express = require("express");
const router = express.Router();
const copyAPI = require("../api/copy-api")

router.get("/", copyAPI().getAllCopies);
router.post("/add", copyAPI().addNewCopy);
router.get("/:id", copyAPI().getCopyByID)

//Get Withdraws Of A Copy By ID
router.get("/:id/withdraws", copyAPI().getCopyWithdrawsByID)

router.get("/:id/check-in", copyAPI().checkinCopyByID)
router.get("/:id/check-out", copyAPI().checkoutCopyByID)

//Check Copy Status
router.get("/:id/status", copyAPI().checkCopyStatus)

module.exports = router;
