import { inject, injectable } from "inversify";
import { CreateUserModel, UserDTO} from "../models/dto/users.dto";
import { Common } from "../ utils  /common";
import { LoginRequest, LoginResponse } from "../models/dto/auth.dto";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { TYPES } from "../config   /types";
import { IAccountDao } from "../dal/account.dao";

dotenv.config();

export interface IAccountService {
    register: (createUserModel: CreateUserModel) => Promise<UserDTO | null>;
    login: (req: LoginRequest) => Promise<LoginResponse | null>;
    authorize: (token: string) => boolean;
    getPayloadAccessToken: (token: string) => any;
    getPayloadRefreshToken: (token: string) => any;
}

@injectable()
export class AccountService implements IAccountService {

    constructor(@inject(TYPES.IAccountDao) private accountDao: IAccountDao) {}

    public async register(createUserModel: CreateUserModel): Promise<UserDTO | null> {
        const password = await Common.encryptPassword(createUserModel.password);
        createUserModel.password = password;
        return await this.accountDao.createAccount(createUserModel);
    }

    public async login(req: LoginRequest): Promise<LoginResponse | null> {
        const user = await this.accountDao.getAccountByEmailOrUsername(req.email, req.username);

        if(user === null) return null;

        const isPasswordMatch = await Common.comparePassword(req.password, user.password);

        if(!isPasswordMatch) return null;

        const payload = {
            username: user.username,
            email: user.email,
            role: Common.getUserRole(user.role)
        };
    
        return new LoginResponse(this.generateAccessToken(payload), this.generateRefreshToken(payload));
    }

    public authorize(token: string): boolean {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) ? true : false;
    }

    public getPayloadAccessToken(token: string): any {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    }

    public getPayloadRefreshToken(token: string): any {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
    }
    

    private generateAccessToken(payload: any): string {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '59m' });
    }

    private generateRefreshToken(payload: any): string {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
    }

}
