"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
const auth_middleware_1 = require("../middlewares /auth.middleware");
const router = (0, express_1.Router)();
// Health check endpoint
router.get('/health', auth_middleware_1.authorize, (req, res) => {
    res.status(200).send('OK');
});
// account routes
router.post('/register', account_controller_1.register);
router.post('/login', account_controller_1.login);
exports.default = router;
//# sourceMappingURL=index.js.map