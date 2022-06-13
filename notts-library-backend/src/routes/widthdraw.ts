const express = require("express");
const router = express.Router();
const NewWithdrawsApi = require("../api/withdraws-api");

router.get("/", NewWithdrawsApi().GetAllWithdraws);
router.post("/add", NewWithdrawsApi().CreateNewWithdraw);
router.get("/:id", NewWithdrawsApi().GetWithdrawById);
router.put("/:id", NewWithdrawsApi().UpdateWithdrawById);

export = router;
