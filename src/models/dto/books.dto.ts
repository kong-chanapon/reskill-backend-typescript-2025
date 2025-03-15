import { AutoMap } from "@automapper/classes";

export class BookDTO {
    @AutoMap()
    id!: string;
    @AutoMap()
    title!: string;
    @AutoMap()
    author!: string;
    @AutoMap()
    price!: number;
    @AutoMap()
    publishedAt!: Date;
    @AutoMap()
    stock!: number;
    @AutoMap()
    category!: number;
}

export class CreateBookModel {
    @AutoMap()
    title!: string;
    @AutoMap()
    author!: string;
    @AutoMap()
    price!: number;
    @AutoMap()
    publishedAt!: Date;
    @AutoMap()
    stock!: number;
    @AutoMap()
    category!: number;
}

export class UpdateBookModel {
    @AutoMap()
    title!: string;
    @AutoMap()
    author!: string;
    @AutoMap()
    price!: number;
    @AutoMap()
    publishedAt!: Date;
    @AutoMap()
    stock!: number;
    @AutoMap()
    category!: number;
}