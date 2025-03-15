export interface  LoginRequest {
    username: string;
    email: string;
    password: string;
}

export class LoginResponse {
    accessToken: string;
    refreshToken: string;

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}