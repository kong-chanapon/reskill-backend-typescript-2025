import { AutoMap } from "@automapper/classes";
import { Request } from "express";

export interface CreateUserModel{
    username: string;
    email: string;
    password: string;
}

export class UserDTO {
    @AutoMap()
    id!: string;

    @AutoMap()
    username!: string;

    @AutoMap()
    email!: string;
}

export interface SearchUsersRequest {
    username: string;
    email: string;
}