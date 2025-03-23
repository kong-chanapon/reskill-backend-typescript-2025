import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { UserEntity } from "../models/entity/user.entity";

export interface IAccountDao {
    createAccount: (model: UserEntity) => Promise<UserEntity | null>;
    getAccountByEmailOrUsername: (email: string, username: string) => Promise<UserEntity | null>;
}


@injectable()
export class AccountDao implements IAccountDao {
    constructor(private prisma: PrismaClient) {}

    public async createAccount(model: UserEntity): Promise<UserEntity | null> {
        try {
            return await this.prisma.users.create({data: model});
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getAccountByEmailOrUsername(email: string, username: string): Promise<UserEntity| null> {
        try {
            const user = await this.prisma.users.findFirst({
                where: { OR: [{ username: username }, { email: email }] }
            });

            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}