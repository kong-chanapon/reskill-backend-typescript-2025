import { Container } from "inversify";
import { IAccountService, AccountService } from "../services/account.service";
import { PrismaClient } from "@prisma/client";
import { BookService, IBookService } from "../services/books.service";
import { TYPES } from "./types";
import { AccountDao, IAccountDao } from "../dal/account.dao";
import { BookDao, IBookDao } from "../dal/books.dao";


const container = new Container();


container.bind<PrismaClient>(PrismaClient).toConstantValue(new PrismaClient());


container.bind<IAccountDao>(TYPES.IAccountDao).to(AccountDao);
container.bind<IAccountService>(TYPES.IAccountService).to(AccountService);

container.bind<IBookDao>(TYPES.IBookDao).to(BookDao);
container.bind<IBookService>(TYPES.IBookService).to(BookService);


export default container;
