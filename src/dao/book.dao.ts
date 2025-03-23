import { PrismaClient } from "@prisma/client";
import { BookEntity } from "../models/entity/book.entity";
import { injectable } from "inversify";

export interface IBookDao {
    getBooks: () => Promise<BookEntity[]>;
    getBookById: (id: string) => Promise<BookEntity | null>;
    createBook: (model: BookEntity) => Promise<BookEntity | null>;
    updateBook: (id: string, model: BookEntity) => Promise<BookEntity | null>;
    deleteBook: (id: string) => Promise<boolean>;
}


@injectable()
export class BookDao implements IBookDao {
    constructor(private prisma: PrismaClient) { }

    public async getBooks(): Promise<BookEntity[]> {
        try {
            return await this.prisma.books.findMany();
        } catch (error) {
            return [];
        }
    }

    public async getBookById(id: string): Promise<BookEntity | null> {
        try {
            const book = await this.prisma.books.findUnique({
                where: {
                    id: id,
                },
            });

            return book;
        } catch (error) {
            return null;
        }
    }

    public async createBook(model: BookEntity): Promise<BookEntity | null> {
        try {
            console.log(model);
            return await this.prisma.books.create({
                data: model,
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async updateBook(id: string, model: BookEntity): Promise<BookEntity | null> {
        try {
            return await this.prisma.books.update({
                where: {
                    id: id,
                },
                data: model,
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async deleteBook(id: string): Promise<boolean> {
        try {
            await this.prisma.books.delete({
                where: {
                    id: id,
                },
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}