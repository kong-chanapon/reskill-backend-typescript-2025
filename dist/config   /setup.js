"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const account_service_1 = require("../services/account.service");
const client_1 = require("@prisma/client");
const container = new inversify_1.Container();
container.bind(client_1.PrismaClient).toConstantValue(new client_1.PrismaClient());
container.bind("IAccountService").to(account_service_1.AccountService);
exports.default = container;
//# sourceMappingURL=setup.js.map