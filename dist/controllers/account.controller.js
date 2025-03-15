"use strict";
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
exports.login = exports.register = void 0;
const setup_1 = __importDefault(require("../config   /setup"));
const result_dto_1 = require("../models/dto/result.dto");
const common_1 = require("../ utils  /common");
const accountService = setup_1.default.get("IAccountService");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield accountService.register(req.body);
        if (!user)
            res.status(500).json(new result_dto_1.Result(common_1.Common.getBizCode("500"), null));
        res.status(201).json(new result_dto_1.Result(common_1.Common.getBizCode("201"), user));
    }
    catch (error) {
        res.status(500).json(new result_dto_1.Result(common_1.Common.getBizCode("500"), null));
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield accountService.login(req.body);
        if (!user)
            res.status(500).json(new result_dto_1.Result(common_1.Common.getBizCode("500"), null));
        res.status(200).json(new result_dto_1.Result(common_1.Common.getBizCode("200"), user));
    }
    catch (error) {
        res.status(500).json(new result_dto_1.Result(common_1.Common.getBizCode("500"), null));
    }
});
exports.login = login;
//# sourceMappingURL=account.controller.js.map