import express from "express";
import newOpenLibraryAPI from "../api/openLibrary-api";

const openLibraryRouter = () => {
    const router = express.Router();
    const openLibraryAPI = newOpenLibraryAPI();

    router.get("/:isbn", openLibraryAPI.getBookDetails);
    router.get("/works/:id", openLibraryAPI.getWorks);

    return router;
};

export default openLibraryRouter;
