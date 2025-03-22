import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { CreateUserModel, UserDTO } from "../models/dto/users.dto";
import { userRoles } from "../ utils  /enum";
import mapper from "../mappings/mapper";
import { UserEntity } from "../models/entity/users.entity";

export interface IAccountDao {
    createAccount: (createUserModel: CreateUserModel) => Promise<UserDTO | null>;
    getAccountByEmailOrUsername: (email: string, username: string) => Promise<UserEntity | null>;
}


@injectable()
export class AccountDao implements IAccountDao {
    constructor(private prisma: PrismaClient) {}

    public async createAccount(createUserModel: CreateUserModel): Promise<UserDTO | null> {
        try {
              const user = await this.prisma.users.create({
                data: {
                        username: createUserModel.username,
                        email: createUserModel.email,
                        password : createUserModel.password,
                        role: userRoles.USER
                }
                });

            return mapper.map(user, UserEntity, UserDTO);
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