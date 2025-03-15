import { Container } from "inversify";
import { IAccountService, AccountService } from "../services/account.service";
import { PrismaClient } from "@prisma/client";
import { BookService, IBookService } from "../services/books.service";

const container = new Container();

container.bind<PrismaClient>(PrismaClient).toConstantValue(new PrismaClient());

container.bind<IAccountService>("IAccountService").to(AccountService);
container.bind<IBookService>("IBookService").to(BookService);

export default container;
