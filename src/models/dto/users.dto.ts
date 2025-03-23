import { AutoMap } from "@automapper/classes";

export class CreateUserModel{
    @AutoMap()
    username!: string;
    @AutoMap()
    email!: string;
    @AutoMap()
    password!: string;
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