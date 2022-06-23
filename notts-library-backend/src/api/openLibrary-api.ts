import { NextFunction, Request, Response } from "express";
import ApiError from "../middleware/api-error";
import fetch from "node-fetch"

const newOpenLibraryAPI = () => {

    const getBookDetails = async (req: Request, res: Response, next: NextFunction) => {
        const ISBN: string = req.params.ISBN;

        if (ISBN == null) {
            next(ApiError.BadRequest("Please Fill URL Param id"));
            return;
        }

        try {
            const bookDetails = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${ISBN}&jscmd=details&format=json`)
            const details = await bookDetails.json();
            res.json(details);
            return;
        } catch (error: any) {
            next(ApiError.BadRequest(error.toString()));
            return;
        }

    }

    const getWorks = async (req: Request, res: Response, next: NextFunction) => {
        const worksID = req.params.id;

        if (worksID == null) {
            next(ApiError.BadRequest("Please provide a valid works SubDirectory in request body"));
            return;
        }

        try {
            const workData = await fetch(`https://openlibrary.org/works/${worksID}.json`)
            const data = await workData.json();
            res.json(data);
            return;
        } catch (error: any) {
            next(ApiError.BadRequest(error.toString()));
            return;
        }

    }


    return {
        getBookDetails,
        getWorks,
    };


}

export = newOpenLibraryAPI;