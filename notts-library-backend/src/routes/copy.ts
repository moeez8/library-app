import express from "express";
import newCopyAPI from "../api/copy-api";

const copyRouter = () => {
	const router = express.Router();
	const copyApi = newCopyAPI();

	router.get("/", copyApi.getAllCopies);
	router.post("/add", copyApi.addNewCopy);
	router.get("/:id", copyApi.getCopyByID);
	router.get("/:id/withdraws", copyApi.getCopyWithdrawsByID);
	router.put("/:id/check-in", copyApi.checkinCopyByID);
	router.put("/:id/check-out", copyApi.checkoutCopyByID);
	router.get("/:id/status", copyApi.checkCopyStatus);

	return router;
};

export default copyRouter;
