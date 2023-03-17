"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilFuncs = void 0;
class UtilFuncs {
    static getBoolean(value) {
        switch (value) {
            case '1':
            case 1:
            case 'true':
            case true:
            case 'on':
            case 'check':
                return true;
            default: return false;
        }
    }
    static createMap(params) {
        const { array, propertyName = 'uuid' } = params;
        const map = new Map();
        const key = propertyName;
        array.forEach(a => map.set(a[key], a));
        return map;
    }
}
exports.UtilFuncs = UtilFuncs;
//# sourceMappingURL=utilFuncs.js.map