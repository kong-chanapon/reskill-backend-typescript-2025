import { AutoMap } from "@automapper/classes";

export class OrderItemEntity {
    @AutoMap()
    id!: string;
    @AutoMap()
    orderId!: string;
    @AutoMap()
    bookId!: string;
    @AutoMap()
    quantity!: number;
    @AutoMap()
    price!: number;
    @AutoMap()
    createdAt!: Date;
    @AutoMap()
    updatedAt!: Date;
}