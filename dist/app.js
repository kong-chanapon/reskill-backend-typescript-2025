"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_options_1 = require("./config   /swagger.options");
const routers_1 = __importDefault(require("./routers"));
const app = (0, express_1.default)();
const specs = (0, swagger_jsdoc_1.default)(swagger_options_1.swaggerOptions);
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.use("/api", routers_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map