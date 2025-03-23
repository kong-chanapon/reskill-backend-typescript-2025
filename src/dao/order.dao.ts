import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { OrderEntity } from "../models/entity/order.entity";

export interface IOrderDao {
    createOrder(model: OrderEntity): Promise<OrderEntity | null>;
    updateOrder(id: string, model: OrderEntity): Promise<OrderEntity | null>;
    getOrderById(id: string): Promise<OrderEntity | null>;
}

@injectable()
export class OrderDao implements IOrderDao {
    constructor(private prisma: PrismaClient) {}

    public async createOrder(model: OrderEntity): Promise<OrderEntity | null> {
        try {
            return await this.prisma.orders.create({
                data:  model
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    public async updateOrder(id: string, model: OrderEntity): Promise<OrderEntity | null> {
        try {
            return await this.prisma.orders.update({
                where: {
                    id: id
                },
                data: model
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    
    public async getOrderById(id: string): Promise<OrderEntity | null> {
        try {
            return await this.prisma.orders.findUnique({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}