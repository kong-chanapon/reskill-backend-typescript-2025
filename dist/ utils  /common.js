"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = void 0;
const bcrypt = __importStar(require("bcrypt"));
const result_dto_1 = require("../models/dto/result.dto");
const enum_1 = require("./enum");
class Common {
    static encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.hash(password, 10);
        });
    }
    static comparePassword(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(password, hash);
        });
    }
    static getBizCode(code) {
        const rstatus = new result_dto_1.RStatus();
        switch (code) {
            case "200": {
                rstatus.code = "200";
                rstatus.description = "Success";
                break;
            }
            case "201": {
                rstatus.code = "201";
                rstatus.description = "Created";
                break;
            }
            case "204": {
                rstatus.code = "204";
                rstatus.description = "No Content";
                break;
            }
            case "400": {
                rstatus.code = "400";
                rstatus.description = "Bad Request";
                break;
            }
            case "401": {
                rstatus.code = "401";
                rstatus.description = "Unauthorized";
                break;
            }
            case "403": {
                rstatus.code = "403";
                rstatus.description = "Forbidden";
                break;
            }
            case "404": {
                rstatus.code = "404";
                rstatus.description = "Not Found";
                break;
            }
            case "409": {
                rstatus.code = "409";
                rstatus.description = "Conflict";
                break;
            }
            case "500": {
                rstatus.code = "500";
                rstatus.description = "Internal Server Error";
                break;
            }
            default: {
                rstatus.code = "500";
                rstatus.description = "Internal Server Error";
                break;
            }
        }
        return rstatus;
    }
    static getUserRole(role) {
        switch (role) {
            case enum_1.userRoles.ADMIN: return "ADMIN";
            case enum_1.userRoles.USER: return "USER";
            case enum_1.userRoles.GUEST: return "GUEST";
            default: return "USER";
        }
    }
}
exports.Common = Common;
//# sourceMappingURL=common.js.map