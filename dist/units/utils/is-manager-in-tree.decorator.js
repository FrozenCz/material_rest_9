"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsManagerInTree = void 0;
const common_1 = require("@nestjs/common");
exports.IsManagerInTree = (0, common_1.createParamDecorator)((data) => {
    console.log(data);
    return 'test';
});
//# sourceMappingURL=is-manager-in-tree.decorator.js.map