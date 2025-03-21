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
exports.authorize = void 0;
const setup_1 = __importDefault(require("../config   /setup"));
const result_dto_1 = require("../models/dto/result.dto");
const common_1 = require("../ utils  /common");
const accountService = setup_1.default.get("IAccountService");
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return res.status(401).json(new result_dto_1.Result(common_1.Common.getBizCode("401"), null));
        const user = yield accountService.authorize(token);
        if (!user)
            res.status(401).json(new result_dto_1.Result(common_1.Common.getBizCode("401"), null));
        const payload = accountService.getPayloadAccessToken(token);
        req.body.userInfo = payload;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map