"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const inversify_1 = require("inversify");
const enum_1 = require("../ utils  /enum");
const users_dto_1 = require("../models/dto/users.dto");
const client_1 = require("@prisma/client");
const users_entity_1 = require("../models/entity/users.entity");
const common_1 = require("../ utils  /common");
const auth_dto_1 = require("../models/dto/auth.dto");
const mapper_1 = __importDefault(require("../mappings/mapper"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
let AccountService = class AccountService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    register(createUserModel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = yield common_1.Common.encryptPassword(createUserModel.password);
                const user = yield this.prisma.users.create({
                    data: {
                        username: createUserModel.username,
                        email: createUserModel.email,
                        password: password,
                        role: enum_1.userRoles.USER
                    }
                });
                if (user === null)
                    return null;
                return mapper_1.default.map(user, users_entity_1.UserEntity, users_dto_1.UserDTO);
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.users.findFirst({
                where: { OR: [{ username: req.username }, { email: req.email }] }
            });
            if (user === null)
                return null;
            const isPasswordMatch = yield common_1.Common.comparePassword(req.password, user.password);
            if (!isPasswordMatch)
                return null;
            const payload = {
                username: user.username,
                email: user.email,
                role: common_1.Common.getUserRole(user.role)
            };
            const accessToken = this.generateAccessToken(payload);
            const refreshToken = this.generateRefreshToken(payload);
            return new auth_dto_1.LoginResponse(accessToken, refreshToken);
        });
    }
    authorize(token) {
        return jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET) ? true : false;
    }
    getPayloadAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    getPayloadRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    }
    generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], AccountService);
//# sourceMappingURL=account.service.js.map