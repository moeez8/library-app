import express from "express";
import newWithdrawsApi from "../api/withdraws-api";

const withdrawsRouter = () => {
	const router = express.Router();
	const withdrawsApi = newWithdrawsApi();

	router.get("/", withdrawsApi.getAllWithdraws);
	router.post("/add", withdrawsApi.createNewWithdraw);
	router.get("/:id", withdrawsApi.getWithdrawById);

	return router;
};

export default withdrawsRouter;
