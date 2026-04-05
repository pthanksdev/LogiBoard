"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDriverInput = void 0;
const create_driver_input_1 = require("./create-driver.input");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateDriverInput extends (0, mapped_types_1.PartialType)(create_driver_input_1.CreateDriverInput) {
    id;
}
exports.UpdateDriverInput = UpdateDriverInput;
//# sourceMappingURL=update-driver.input.js.map