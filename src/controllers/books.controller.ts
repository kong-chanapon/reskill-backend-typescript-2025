import { Request, Response } from "express";
import { Common } from "../ utils  /common";
import container from "../config   /setup";
import { Result } from "../models/dto/result.dto";
import { IBookService } from "../services/books.service";

const BookService = container.get<IBookService>("IBookService");

export const getBooksAsync = async (req: Request, res: Response) => {
    try {
        const books = await BookService.getBooksAsync();
        if (books.length === 0) {
            res.status(201).json(new Result(Common.getBizCode("201"), null));
        }

        res.status(200).json(new Result(Common.getBizCode("200"), books));
    } catch (error) {
        res.status(500).json(new Result(Common.getBizCode("500"), null));
    }
};

export const getBookByIdAsync = async (req: Request, res: Response) => {
    try {
        const book = await BookService.getBookByIdAsync(req.params.id);
        if (!book) {
            res.status(201).json(new Result(Common.getBizCode("201"), null));
        }

        res.status(200).json(new Result(Common.getBizCode("200"), book));
    } catch (error) {
        res.status(500).json(new Result(Common.getBizCode("500"), null));
    }
};

export const createBookAsync = async (req: Request, res: Response) => {
    try {
        const book = await BookService.createBookAsync(req.body);
        if (!book) {
            res.status(500).json(new Result(Common.getBizCode("500"), null));
        }

        res.status(200).json(new Result(Common.getBizCode("200"), book));
    } catch (error) {
        res.status(500).json(new Result(Common.getBizCode("500"), null));
    }
};

export const updateBookAsync = async (req: Request, res: Response) => {
    try {
        const book = await BookService.updateBookAsync(req.params.id, req.body);
        if (!book) {
            res.status(500).json(new Result(Common.getBizCode("500"), null));
        }

        res.status(200).json(new Result(Common.getBizCode("200"), book));
    } catch (error) {
        res.status(500).json(new Result(Common.getBizCode("500"), null));
    }
};

export const deleteBookAsync = async (req: Request, res: Response) => {
    try {
        const result = await BookService.deleteBookAsync(req.params.id);
        if (!result) {
            res.status(500).json(new Result(Common.getBizCode("500"), null));
        }

        res.status(200).json(new Result(Common.getBizCode("200"), result));
    } catch (error) {
        res.status(500).json(new Result(Common.getBizCode("500"), null));
    }
};


