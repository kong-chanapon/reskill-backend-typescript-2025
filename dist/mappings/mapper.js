"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@automapper/core");
const classes_1 = require("@automapper/classes");
const users_entity_1 = require("../models/entity/users.entity");
const users_dto_1 = require("../models/dto/users.dto");
// Create and export the mapper
const mapper = (0, core_1.createMapper)({
    strategyInitializer: (0, classes_1.classes)(),
});
// Create the map
(0, core_1.createMap)(mapper, users_entity_1.UserEntity, users_dto_1.UserDTO);
(0, core_1.createMap)(mapper, users_dto_1.UserDTO, users_entity_1.UserEntity);
exports.default = mapper;
//# sourceMappingURL=mapper.js.map