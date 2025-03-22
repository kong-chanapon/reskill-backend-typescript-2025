import { AutoMap } from "@automapper/classes";

export class UserEntity {
    @AutoMap()
    id!: string;
    @AutoMap()
    username!: string;
    @AutoMap()
    email!: string;
    @AutoMap()
    password!: string;
    @AutoMap()
    role!: number;
}