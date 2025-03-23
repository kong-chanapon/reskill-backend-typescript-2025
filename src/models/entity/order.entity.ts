import { AutoMap } from "@automapper/classes";

export class OrderEntity {
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