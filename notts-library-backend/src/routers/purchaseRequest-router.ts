import express from "express";
import newPurchaseRequestAPI from "../api/purchaseRequest-api";

const purchaseRequestRouter = () => {
	const router = express.Router();
	const purchaseRequestApi = newPurchaseRequestAPI();

	router.post("/", purchaseRequestApi.addRequest);
	router.get("/", purchaseRequestApi.searchForRequest);
	router.get("/:id", purchaseRequestApi.getRequestByID);
	router.put("/:id/close", purchaseRequestApi.updateRequestByID);
	router.put("/:id/fulfill", purchaseRequestApi.fulfillRequestByID);
	router.delete("/:id", purchaseRequestApi.deleteRequestByID);

	return router;
};

export default purchaseRequestRouter;
