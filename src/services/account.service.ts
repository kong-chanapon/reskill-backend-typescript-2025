import { injectable } from "inversify";
import { userRoles } from "../ utils  /enum";
import { CreateUserModel, UserDTO} from "../models/dto/users.dto";
import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../models/entity/users.entity";
import { Common } from "../ utils  /common";
import { LoginRequest, LoginResponse } from "../models/dto/auth.dto";
import mapper from "../mappings/mapper";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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

    constructor(private prisma: PrismaClient) {}

    public async register(createUserModel: CreateUserModel): Promise<UserDTO | null> {
       try {
            const password = await Common.encryptPassword(createUserModel.password);
            const user = await this.prisma.users.create({
            data: {
                    username: createUserModel.username,
                    email: createUserModel.email,
                    password : password,
                    role: userRoles.USER
            }
            });

            if (user === null) return null;

            return mapper.map(user, UserEntity, UserDTO);
       
       } catch (error) {
            console.error(error);
            return null;
       }
    }

    public async login(req: LoginRequest): Promise<LoginResponse | null> {
            const user = await this.prisma.users.findFirst({
                where: { OR: [{ username: req.username }, { email: req.email }] }
            });
    
            if(user === null) return null;
    
            const isPasswordMatch = await Common.comparePassword(req.password, user.password);
    
            if(!isPasswordMatch) return null;
    
            const payload = {
                username: user.username,
                email: user.email,
                role: Common.getUserRole(user.role)
            };
    
            const accessToken = this.generateAccessToken(payload);
            const refreshToken = this.generateRefreshToken(payload);
            
    
            return new LoginResponse(accessToken, refreshToken);
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
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
    }

    private generateRefreshToken(payload: any): string {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
    }

}
