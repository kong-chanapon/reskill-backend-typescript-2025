import { AutoMap } from "@automapper/classes";

export class BookEntity {
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
    @AutoMap()
    createdAt!: Date;
    @AutoMap()
    updatedAt!: Date;
}