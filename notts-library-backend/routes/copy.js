const express = require("express");
const router = express.Router();
const copyAPI = require("../api/copy-api")

//Get All Copies
router.get("/", copyAPI().getAllCopies);

//Add New Copy
router.post("/add", copyAPI().addNewCopy);

//Get A Copy By ID
router.get("/:id", copyAPI().getCopyByID)

//Get Withdraws Of A Copy By ID
router.get("/:id/withdraws", copyAPI().getCopyWithdrawsByID)

//Check In A Copy By ID
router.get("/:id/check-in", copyAPI().checkinCopyByID)

//Check Out A Copy By ID
router.get("/:id/check-out", copyAPI().checkoutCopyByID)

//Check Copy Status
router.get("/:id/status", copyAPI().checkCopyStatus)

module.exports = router;
