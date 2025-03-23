import { BookDTO, CreateBookModel, UpdateBookModel } from "../models/dto/books.dto";
import mapper from "../mappings/mapper";
import { BookEntity } from "../models/entity/book.entity";
import { inject, injectable } from "inversify";
import { Common } from "../ utils  /common";
import { TYPES } from "../config   /types";
import { IBookDao } from "../dao/book.dao";

export interface IBookService {
    getBooksAsync: () => Promise<BookDTO[]>;
    getBookByIdAsync: (id: string) => Promise<BookEntity | null>;
    createBookAsync: (model: CreateBookModel) => Promise<BookDTO | null>;
    updateBookAsync: (id:string, model: UpdateBookModel) => Promise<BookDTO | null>;
    deleteBookAsync: (id: string) => Promise<boolean>;
}

@injectable()
export class BookService implements IBookService {

    constructor(@inject(TYPES.IBookDao) private bookDao: IBookDao) {}

    public async getBooksAsync(): Promise<BookDTO[]> {
        const result = await this.bookDao.getBooks();
        return mapper.mapArray(result, BookEntity, BookDTO);
    }

    public async getBookByIdAsync(id: string): Promise<BookEntity| null> {
        return await this.bookDao.getBookById(id);
    }
    
    public async createBookAsync(model: CreateBookModel): Promise<BookDTO | null> {
        model.publishedAt = new Date(model.publishedAt);
        const bookEntity = mapper.map(model, CreateBookModel, BookEntity);

        const result = await this.bookDao.createBook(bookEntity);
        
        return result ? mapper.map(result, BookEntity, BookDTO) : null;
    }

    public async updateBookAsync(id:string, model: UpdateBookModel): Promise<BookDTO | null> {
        const oldBook = await this.bookDao.getBookById(id);
        if (!oldBook) return null;

        const updatedBook = { ...oldBook, ...model };
        updatedBook.publishedAt = new Date(updatedBook.publishedAt);
        const bookEntity = mapper.map(updatedBook, UpdateBookModel, BookEntity);

        const result = await this.bookDao.updateBook(id, bookEntity);
        if(result === null) return null;

        return result ? mapper.map(result, BookEntity, BookDTO) : null;
    }

    public async deleteBookAsync(id: string): Promise<boolean> {
        const book = await this.bookDao.getBookById(id);
        if (!book) return false;

        return await this.bookDao.deleteBook(id);
    }
}