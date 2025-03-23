import { AutoMap } from "@automapper/classes";

export class OrderDto {
    @AutoMap()
    id!: string;
    @AutoMap()
    userId!: string;
    @AutoMap()
    total!: number;
    @AutoMap()
    status!: number;
    @AutoMap()
    createdAt!: Date;
    @AutoMap()
    updatedAt!: Date;
}

export class CreateOrderModel {
    @AutoMap()
    userId!: string;
}

export class UpdateOrderModel {
    @AutoMap()
    status!: number;
}