import { inject, injectable } from "inversify";
import { CreateOrderModel, OrderDto, UpdateOrderModel } from "../models/dto/order.dto";
import { TYPES } from "../config   /types";
import { IOrderDao } from "../dao/order.dao";
import mapper from "../mappings/mapper";
import { OrderEntity } from "../models/entity/order.entity";
import { Common } from "../ utils  /common";

export interface IOrderService {
    createOrder: (model: CreateOrderModel) => Promise<OrderDto | null>;
    updateOrder: (id: string, model: UpdateOrderModel) => Promise<OrderDto | null>;
    getOrderById: (id: string) => Promise<OrderDto | null>;
}

@injectable()
export class OrderService implements IOrderService {
    constructor(@inject(TYPES.IOrderDao) private orderDao: IOrderDao) {}

    public async createOrder(model: CreateOrderModel): Promise<OrderDto | null> {
        try {
            const orderEntity = mapper.map(model, CreateOrderModel, OrderEntity);
        
            const result = await this.orderDao.createOrder(orderEntity);
            
            return result ? mapper.map(result, OrderEntity, OrderDto) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async updateOrder(id: string, model: UpdateOrderModel): Promise<OrderDto | null> {
        try {
            const order = await this.orderDao.getOrderById(id);
            if (!order) return null;

            const updatedOrder = { ...order, ...model };
            updatedOrder.updatedAt = Common.getCurrentDate();
            const orderEntity = mapper.map(updatedOrder, UpdateOrderModel, OrderEntity);

            const result = await this.orderDao.updateOrder(id, orderEntity);
            return result ? mapper.map(result, OrderEntity, OrderDto) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getOrderById(id: string): Promise<OrderDto | null> {
        try {
            const result = await this.orderDao.getOrderById(id);
            return result ? mapper.map(result, OrderEntity, OrderDto) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}