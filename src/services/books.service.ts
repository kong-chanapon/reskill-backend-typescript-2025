import { BookDTO, CreateBookModel, UpdateBookModel } from "../models/dto/books.dto";
import mapper from "../mappings/mapper";
import { BookEntity } from "../models/entity/books.entity";
import { inject, injectable } from "inversify";
import { Common } from "../ utils  /common";
import { TYPES } from "../config   /types";
import { IBookDao } from "../dal/books.dao";

export interface IBookService {
    getBooksAsync: () => Promise<BookDTO[]>;
    getBookByIdAsync: (id: string) => Promise<BookEntity | null>;
    createBookAsync: (book: CreateBookModel) => Promise<BookDTO | null>;
    updateBookAsync: (id:string, book: UpdateBookModel) => Promise<BookDTO | null>;
    deleteBookAsync: (id: string) => Promise<boolean>;
}

@injectable()
export class BookService implements IBookService {

    constructor(@inject(TYPES.IBookDao) private bookDao: IBookDao) {}

    public async getBooksAsync(): Promise<BookDTO[]> {
        return await this.bookDao.getBooks();
    }

    public async getBookByIdAsync(id: string): Promise<BookEntity| null> {
        return await this.bookDao.getBookById(id);
    }
    
    public async createBookAsync(book: CreateBookModel): Promise<BookDTO | null> {
        book.publishedAt = new Date(book.publishedAt);
        const bookEntity = mapper.map(book, CreateBookModel, BookEntity);
        const currentDate = Common.getCurrentDate();
        bookEntity.createdAt = currentDate;
        
        return await this.bookDao.createBook(bookEntity);
    }

    public async updateBookAsync(id:string, book: UpdateBookModel): Promise<BookDTO | null> {
        const oldBook = await this.bookDao.getBookById(id);
        if (!oldBook) return null;

        const updatedBook = { ...oldBook, ...book };
        updatedBook.publishedAt = new Date(updatedBook.publishedAt);
        updatedBook.updatedAt = Common.getCurrentDate();

        return await this.bookDao.updateBook(id, updatedBook);
    }

    public async deleteBookAsync(id: string): Promise<boolean> {
        const book = await this.bookDao.getBookById(id);
        if (!book) return false;

        return await this.bookDao.deleteBook(id);
    }
}