import { Container } from "inversify";
import { IAccountService, AccountService } from "../services/account.service";
import { PrismaClient } from "@prisma/client";
import { BookService, IBookService } from "../services/book.service";
import { TYPES } from "./types";
import { AccountDao, IAccountDao } from "../dao/account.dao";
import { BookDao, IBookDao } from "../dao/book.dao";
import { IOrderDao, OrderDao } from "../dao/order.dao";
import { IOrderService, OrderService } from "../services/order.service";


const container = new Container();


container.bind<PrismaClient>(PrismaClient).toConstantValue(new PrismaClient());


container.bind<IAccountDao>(TYPES.IAccountDao).to(AccountDao);
container.bind<IAccountService>(TYPES.IAccountService).to(AccountService);

container.bind<IBookDao>(TYPES.IBookDao).to(BookDao);
container.bind<IBookService>(TYPES.IBookService).to(BookService);

container.bind<IOrderDao>(TYPES.IOrderDao).to(OrderDao);
container.bind<IOrderService>(TYPES.IOrderService).to(OrderService);


export default container;
