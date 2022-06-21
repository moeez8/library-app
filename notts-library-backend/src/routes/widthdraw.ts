import express from "express";
import newWithdrawsApi from "../api/withdraws-api";

const withdrawsRouter = () => {
	const router = express.Router();
	const withdrawsApi = newWithdrawsApi();

	router.get("/", withdrawsApi.GetAllWithdraws);
	router.post("/add", withdrawsApi.CreateNewWithdraw);
	router.get("/:id", withdrawsApi.GetWithdrawById);

	return router;
};

export default withdrawsRouter;
