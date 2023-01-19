"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transforms = void 0;
class Transforms {
    static assetToAssetDto(asset) {
        return Object.assign(Object.assign({}, asset), { removingProtocol_id: null });
    }
    static userToUserDto(u, reachableUsers) {
        return {
            id: u.id,
            username: u.username,
            name: u.name,
            surname: u.surname,
            reachable: !!reachableUsers.get(u.id),
            unit_id: u.unit.id,
        };
    }
}
exports.Transforms = Transforms;
//# sourceMappingURL=transforms.js.map