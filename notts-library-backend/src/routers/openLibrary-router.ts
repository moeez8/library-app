import express from "express";
import newOpenLibraryAPI from "../api/openLibrary-api";

const openLibraryRouter = () => {
    const router = express.Router();
    const openLibraryAPI = newOpenLibraryAPI();

    router.get("/details/:ISBN", openLibraryAPI.getBookDetails);
    router.get("/data/:ISBN", openLibraryAPI.getBookData);
    router.get("/works/:id", openLibraryAPI.getWorks);

    return router;
};

export default openLibraryRouter;
