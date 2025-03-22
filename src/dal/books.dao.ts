import { PrismaClient } from "@prisma/client";
import { BookDTO, CreateBookModel, UpdateBookModel } from "../models/dto/books.dto";
import mapper from "../mappings/mapper";
import { BookEntity } from "../models/entity/books.entity";
import { injectable } from "inversify";

export interface IBookDao {
    getBooks: () => Promise<BookDTO[]>;
    getBookById: (id: string) => Promise<BookEntity | null>;
    createBook: (book: CreateBookModel) => Promise<BookDTO | null>;
    updateBook: (id:string, book: UpdateBookModel) => Promise<BookDTO | null>;
    deleteBook: (id: string) => Promise<boolean>;
}


@injectable()
export class BookDao implements IBookDao {
    constructor(private prisma: PrismaClient) {}

    public async getBooks(): Promise<BookDTO[]> {
        try {
            const books = await this.prisma.books.findMany();

            return mapper.mapArray(books, BookEntity, BookDTO);
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
    
    public async createBook(book: CreateBookModel): Promise<BookDTO | null> {
       try { 
            const newBook = await this.prisma.books.create({
                data: book,
            });

            return mapper.map(newBook, BookEntity, BookDTO);
       } catch (error) {
            console.log(error);
            return null;
       }
    }

    public async updateBook(id:string, book: UpdateBookModel): Promise<BookDTO | null> {
        try {
            const updatedBook = await this.prisma.books.update({
                where: {
                    id: id,
                },
                data: {
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    publishedAt: book.publishedAt,
                    stock: book.stock,
                    category: book.category,
                    updatedAt: book.updatedAt,
                }
            });

            return mapper.map(updatedBook, BookEntity, BookDTO);
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