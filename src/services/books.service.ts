import { PrismaClient } from "@prisma/client";
import { BookDTO, CreateBookModel, UpdateBookModel } from "../models/dto/books.dto";
import mapper from "../mappings/mapper";
import { BookEntity } from "../models/entity/books.entity";
import { injectable } from "inversify";

export interface IBookService {
    getBooksAsync: () => Promise<BookDTO[]>;
    getBookByIdAsync: (id: string) => Promise<BookDTO | null>;
    createBookAsync: (book: CreateBookModel) => Promise<BookDTO | null>;
    updateBookAsync: (id: string, book: UpdateBookModel) => Promise<BookDTO | null>;
    deleteBookAsync: (id: string) => Promise<boolean>;
}

@injectable()
export class BookService implements IBookService {
      constructor(private prisma: PrismaClient) {}

    public async getBooksAsync(): Promise<BookDTO[]> {
        try {
            const books = await this.prisma.books.findMany();

            return mapper.mapArray(books, BookEntity, BookDTO);
        } catch (error) {
            return [];
        }
    }

    public async getBookByIdAsync(id: string): Promise<BookDTO | null> {
        try {
            const book = await this.prisma.books.findUnique({
                where: {
                    id: id,
                },
            });

            return mapper.map(book, BookEntity, BookDTO);
        } catch (error) {
            return null;
        }
    }
    
    public async createBookAsync(book: CreateBookModel): Promise<BookDTO | null> {
       try {
            const bookEntity = mapper.map(book, CreateBookModel, BookEntity);
            const newBook = await this.prisma.books.create({
                data: bookEntity,
            });

            return mapper.map(newBook, BookEntity, BookDTO);
       } catch (error) {
            return null;
       }
    }

    public async updateBookAsync(id: string, book: UpdateBookModel): Promise<BookDTO | null> {
        try {
            const bookEntity = mapper.map(book, UpdateBookModel, BookEntity);
            const updatedBook = await this.prisma.books.update({
                where: {
                    id: id,
                },
                data: bookEntity,
            });

            return mapper.map(updatedBook, BookEntity, BookDTO);
        } catch (error) {
            return null;
        }
    }

    public async deleteBookAsync(id: string): Promise<boolean> {
        try {
            await this.prisma.books.delete({
                where: {
                    id: id,
                },
            });

            return true;
        } catch (error) {
            return false;
        }
    }
}